import { Component } from '@angular/core';

@Component({
    selector: 'app-workbench',
    templateUrl: './workbench.component.html',
    styleUrls: ['./workbench.component.scss']
})
export class WorkbenchComponent {
    isDragging = false;
    files: File[] = [];
    outputFormat: 'json' | 'csv' | 'text' = 'json';
    outputText = 'Output';
    previewUrl: string | null = null;
    showOutput = false;
    mockJson: { account: string; owner: string; period: string; transactions: Array<{ date: string; desc: string; amount: number; balance: number }>; };
    mockCsv = '';
    mockText = '';

    onDragOver(event: DragEvent) {
        event.preventDefault();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        this.isDragging = false;
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        this.isDragging = false;
        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length) {
            this.addFiles(event.dataTransfer.files);
        }
    }

    onFileSelect(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length) {
            this.addFiles(input.files);
            input.value = '';
        }
    }

    constructor() {
        // Build lots of sample transactions (200 rows)
        const start = new Date('2025-01-01');
        let balance = 0;
        const transactions: Array<{ date: string; desc: string; amount: number; balance: number }> = [];
        const csvRows: string[] = ['date,description,amount,balance'];
        const textRows: string[] = [
            'Account: 123-456-789',
            'Owner: John Doe',
            'Period: 2025-01-01 to 2025-01-31'
        ];

        for (let i = 0; i < 200; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + (i % 31));
            const isDeposit = i % 5 === 0;
            const amount = Number((isDeposit ? 100 + (i % 7) * 10 : -(5 + (i % 20))).toFixed(2));
            balance = Number((balance + amount).toFixed(2));
            const row = {
                date: d.toISOString().slice(0, 10),
                desc: isDeposit ? 'Deposit' : 'Purchase',
                amount,
                balance
            };
            transactions.push(row);
            csvRows.push(`${row.date},${row.desc},${row.amount.toFixed(2)},${row.balance.toFixed(2)}`);
            const sign = row.amount >= 0 ? '+' : '';
            textRows.push(`- ${row.date} ${row.desc} ${sign}${row.amount.toFixed(2)} Balance: ${row.balance.toFixed(2)}`);
        }

        this.mockJson = {
            account: '123-456-789',
            owner: 'John Doe',
            period: '2025-01-01 to 2025-01-31',
            transactions
        };
        this.mockCsv = csvRows.join('\n') + '\n';
        this.mockText = textRows.join('\n');
    }

    submit() {
        if (!this.files.length) {
            this.outputText = 'Please add a file first.';
            return;
        }
        this.outputText = `Processed ${this.files.length} file(s). (Mock)`;
        this.outputFormat = 'json';
        this.showOutput = true;
    }

    private addFiles(fileList: FileList) {
        this.files = [...this.files, ...Array.from(fileList).slice(0, 5)];
        this.updatePreview();
    }

    setFormat(fmt: 'json' | 'csv' | 'text') {
        this.outputFormat = fmt;
    }

    get displayOutput(): string {
        switch (this.outputFormat) {
            case 'json':
                return JSON.stringify(this.mockJson, null, 2);
            case 'csv':
                return this.mockCsv;
            case 'text':
                return this.mockText;
        }
    }

    private updatePreview() {
        const firstImage = this.files.find(f => f.type.startsWith('image/'));
        if (!firstImage) {
            this.previewUrl = null;
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.previewUrl = typeof reader.result === 'string' ? reader.result : null;
        };
        reader.readAsDataURL(firstImage);
    }
}


