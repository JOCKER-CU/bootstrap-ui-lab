import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface FolderItem {
    id: number;
    name: string;
    subtitle: string;
    location?: string;
    modifiedAt?: Date;
}

interface FileItem {
    id: number;
    name: string;
    type: 'pdf' | 'xlsx' | 'image' | 'csv' | 'docx';
    subtitle: string;
    tag?: string;
    updatedAt: Date;
}

@Component({
    selector: 'app-folder-browser',
    templateUrl: './folder-browser.component.html',
    styleUrls: ['./folder-browser.component.scss']
})
export class FolderBrowserComponent {
    query = '';
    selectedPeriod: 'day' | 'week' | 'month' | 'year' | null = 'month';
    groupBy: 'none' | 'type' = 'none';
    viewMode: 'grid' | 'list' = 'grid';
    selectedFolder: FolderItem | null = null;
    showInfo = false;

    constructor(private router: Router) { }

    folders: FolderItem[] = [
        { id: 1, name: 'Payroll', subtitle: 'In HR', location: 'D:/Company/HR/Payroll', modifiedAt: addDays(-3) },
        { id: 2, name: 'HR', subtitle: 'In Company', location: 'D:/Company/HR', modifiedAt: addDays(-8) },
        { id: 3, name: 'Stock Valuation', subtitle: 'In Inventory', location: 'D:/Inventory/Valuation', modifiedAt: addDays(-32) },
        { id: 4, name: 'Inventory', subtitle: 'In Company', location: 'D:/Inventory', modifiedAt: addDays(-1) },
        { id: 5, name: 'Sales', subtitle: 'In Company', location: 'D:/Company/Sales', modifiedAt: addDays(-20) },
        { id: 6, name: 'Shared', subtitle: 'In Brand 1', location: 'D:/Brand1/Shared', modifiedAt: addDays(-15) },
        { id: 7, name: 'Brand 2', subtitle: 'In Marketing', location: 'D:/Marketing/Brand2', modifiedAt: addDays(-60) },
        { id: 8, name: 'Brand 1', subtitle: 'In Marketing', location: 'D:/Marketing/Brand1', modifiedAt: addDays(-5) },
        { id: 9, name: 'Internal', subtitle: 'In Company', location: 'D:/Company/Internal', modifiedAt: addDays(-12) },
        { id: 10, name: 'Products', subtitle: 'In Company', location: 'D:/Company/Products', modifiedAt: addDays(-90) },
        { id: 11, name: 'Spreadsheet', subtitle: 'In Company', location: 'D:/Company/Spreadsheet', modifiedAt: addDays(-4) },
        { id: 12, name: 'Support', subtitle: 'In Company', location: 'D:/Company/Support', modifiedAt: addDays(-7) },
        { id: 13, name: 'Marketing', subtitle: 'In Company', location: 'D:/Company/Marketing', modifiedAt: addDays(-18) },
        { id: 14, name: 'Finance', subtitle: 'In Company', location: 'D:/Company/Finance', modifiedAt: addDays(-25) }
    ];

    files: FileItem[] = [
        { id: 101, name: 'INV_2025_00007.pdf', type: 'pdf', subtitle: 'INV/2025/00007', tag: 'To Validate', updatedAt: new Date() },
        { id: 102, name: 'Employee Tasks Report B...', type: 'csv', subtitle: 'Product > Plans', tag: 'To Validate', updatedAt: addDays(-10) },
        { id: 103, name: 'Odoo 17 Learning Plan.xlsx', type: 'xlsx', subtitle: 'Product > New', updatedAt: addDays(-35) },
        { id: 104, name: 'Quarterly Summary.pdf', type: 'pdf', subtitle: 'Finance > Q1', updatedAt: addDays(-90) },
        { id: 105, name: 'Product Shots', type: 'image', subtitle: 'Marketing', updatedAt: addDays(-2) }
    ];

    get filteredFolders(): FolderItem[] {
        const q = this.query.toLowerCase();
        return this.folders.filter(f => !q || f.name.toLowerCase().includes(q));
    }

    get filteredFiles(): FileItem[] {
        const q = this.query.toLowerCase();
        const bySearch = this.files.filter(f => !q || f.name.toLowerCase().includes(q));
        const byDate = this.selectedPeriod ? bySearch.filter(f => isWithinPeriod(f.updatedAt, this.selectedPeriod!)) : bySearch;
        if (this.groupBy === 'type') {
            return byDate.slice().sort((a, b) => a.type.localeCompare(b.type));
        }
        return byDate;
    }

    setPeriod(period: 'day' | 'week' | 'month' | 'year') {
        this.selectedPeriod = period;
    }

    clearPeriod() {
        this.selectedPeriod = null;
    }

    setView(mode: 'grid' | 'list') {
        this.viewMode = mode;
    }

    selectFolder(folder: FolderItem) {
        this.selectedFolder = folder;
    }

    openInfo() {
        if (!this.selectedFolder && this.filteredFolders.length) {
            this.selectedFolder = this.filteredFolders[0];
        }
        this.showInfo = !!this.selectedFolder;
    }

    closeInfo() {
        this.showInfo = false;
    }

    onFolderDoubleClick(folder: FolderItem) {
        // Navigate to image gallery with folder information
        this.router.navigate(['/image-gallery'], {
            queryParams: {
                folderName: folder.name,
                folderId: folder.id
            }
        });
    }
}

// Helpers
function addDays(delta: number): Date {
    const d = new Date();
    d.setDate(d.getDate() + delta);
    return d;
}

function isWithinPeriod(date: Date, period: 'day' | 'week' | 'month' | 'year'): boolean {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    switch (period) {
        case 'day': return diffMs <= oneDay;
        case 'week': return diffMs <= 7 * oneDay;
        case 'month': return diffMs <= 30 * oneDay;
        case 'year': return diffMs <= 365 * oneDay;
    }
}


