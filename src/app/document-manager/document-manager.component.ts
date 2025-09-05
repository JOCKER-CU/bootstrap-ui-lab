import { Component, OnInit } from '@angular/core';

interface DocumentItem {
    id: number;
    name: string;
    folder: string;
    owner: string;
    ownerAvatar: string;
    contact: string;
    contactLogo?: string;
    size: string;
    type: 'pdf' | 'docx' | 'xlsx' | 'png' | 'jpg';
    isSelected: boolean;
    isFavorite: boolean;
    status?: string;
    statusColor?: string;
    linkedTo?: string;
    attachments?: number;
    followers?: number;
    lastModified: Date;
}

interface ActivityItem {
    id: number;
    user: string;
    userAvatar: string;
    action: string;
    timestamp: Date;
    message: string;
}

@Component({
    selector: 'app-document-manager',
    templateUrl: './document-manager.component.html',
    styleUrls: ['./document-manager.component.scss']
})
export class DocumentManagerComponent implements OnInit {
    selectedDocument: DocumentItem | null = null;
    selectedDocuments: Set<number> = new Set();
    searchQuery = '';

    documents: DocumentItem[] = [
        {
            id: 1,
            name: 'INV_2025_00007.pdf',
            folder: 'Finance',
            owner: 'Mitchell Admin',
            ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            contact: 'Azure Interior',
            contactLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=20&h=20&fit=crop',
            size: '33kB',
            type: 'pdf',
            isSelected: false,
            isFavorite: false,
            status: 'To Validate',
            statusColor: 'warning',
            linkedTo: 'INV/2025/00007',
            attachments: 1,
            followers: 1,
            lastModified: new Date('2025-07-16T23:06:00')
        },
        {
            id: 2,
            name: 'Commercial Invoice Template.docx',
            folder: 'Finance',
            owner: 'Mitchell Admin',
            ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            contact: 'Azure Interior',
            contactLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=20&h=20&fit=crop',
            size: '45kB',
            type: 'docx',
            isSelected: false,
            isFavorite: false,
            status: 'Approved',
            statusColor: 'success',
            linkedTo: 'TEMPLATE/COMMERCIAL',
            attachments: 0,
            followers: 0,
            lastModified: new Date('2025-07-15T14:30:00')
        },
        {
            id: 3,
            name: 'Invoice Operations Manual.pdf',
            folder: 'Finance',
            owner: 'Mitchell Admin',
            ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            contact: '',
            size: '2.1MB',
            type: 'pdf',
            isSelected: false,
            isFavorite: true,
            status: 'Draft',
            statusColor: 'secondary',
            linkedTo: 'MANUAL/INVOICE',
            attachments: 3,
            followers: 2,
            lastModified: new Date('2025-07-14T09:15:00')
        },
        {
            id: 4,
            name: 'Invoice Azure Integration.xlsx',
            folder: 'Finance',
            owner: 'Mitchell Admin',
            ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            contact: '',
            size: '156kB',
            type: 'xlsx',
            isSelected: false,
            isFavorite: false,
            status: 'In Review',
            statusColor: 'info',
            linkedTo: 'INTEGRATION/AZURE',
            attachments: 0,
            followers: 1,
            lastModified: new Date('2025-07-13T16:45:00')
        },
        {
            id: 5,
            name: 'Invoice-IN-2025-001.pdf',
            folder: 'Finance',
            owner: 'Mitchell Admin',
            ownerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            contact: '',
            size: '78kB',
            type: 'pdf',
            isSelected: false,
            isFavorite: false,
            status: 'Sent',
            statusColor: 'primary',
            linkedTo: 'INVOICE/2025/001',
            attachments: 2,
            followers: 0,
            lastModified: new Date('2025-07-12T11:20:00')
        }
    ];

    activities: ActivityItem[] = [
        {
            id: 1,
            user: 'Mitchell Admin',
            userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            action: 'Document created',
            timestamp: new Date('2025-07-16T23:06:00'),
            message: 'Document created'
        },
        {
            id: 2,
            user: 'Sarah Johnson',
            userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
            action: 'Status updated',
            timestamp: new Date('2025-07-16T22:30:00'),
            message: 'Changed status to "To Validate"'
        },
        {
            id: 3,
            user: 'Mike Chen',
            userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
            action: 'Document shared',
            timestamp: new Date('2025-07-16T21:15:00'),
            message: 'Shared with Finance team'
        }
    ];

    constructor() { }

    ngOnInit() {
        // No document selected by default
    }

    selectDocument(document: DocumentItem) {
        // Toggle selection
        document.isSelected = !document.isSelected;

        if (document.isSelected) {
            this.selectedDocuments.add(document.id);
        } else {
            this.selectedDocuments.delete(document.id);
        }

        // Update selectedDocument based on selection count
        if (this.selectedDocuments.size === 1) {
            // Find the selected document
            this.selectedDocument = this.documents.find(doc => this.selectedDocuments.has(doc.id)) || null;
        } else {
            // Clear selectedDocument if not exactly one selection
            this.selectedDocument = null;
        }
    }

    toggleCheckbox(document: DocumentItem, event: Event) {
        event.stopPropagation();
        this.selectDocument(document);
    }

    getSelectedCount(): number {
        return this.selectedDocuments.size;
    }

    hasSelectedDocuments(): boolean {
        return this.selectedDocuments.size > 0;
    }

    hasSingleSelection(): boolean {
        return this.selectedDocuments.size === 1;
    }

    isAllSelected(): boolean {
        return this.filteredDocuments.length > 0 &&
            this.filteredDocuments.every(doc => this.selectedDocuments.has(doc.id));
    }

    toggleSelectAll() {
        if (this.isAllSelected()) {
            // Deselect all
            this.filteredDocuments.forEach(doc => {
                doc.isSelected = false;
                this.selectedDocuments.delete(doc.id);
            });
            this.selectedDocument = null;
        } else {
            // Select all
            this.filteredDocuments.forEach(doc => {
                doc.isSelected = true;
                this.selectedDocuments.add(doc.id);
            });
            // Clear selectedDocument since multiple documents are selected
            this.selectedDocument = null;
        }
    }

    toggleFavorite(document: DocumentItem) {
        document.isFavorite = !document.isFavorite;
    }

    getDocumentIcon(type: string): string {
        switch (type) {
            case 'pdf': return '📄';
            case 'docx': return '📝';
            case 'xlsx': return '📊';
            case 'png': return '🖼️';
            case 'jpg': return '🖼️';
            default: return '📄';
        }
    }

    getStatusColor(status: string): string {
        switch (status) {
            case 'To Validate': return 'warning';
            case 'Approved': return 'success';
            case 'Draft': return 'secondary';
            case 'In Review': return 'info';
            case 'Sent': return 'primary';
            default: return 'light';
        }
    }

    formatDate(date: Date): string {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    }

    formatTime(date: Date): string {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(date);
    }

    sendMessage() {
        console.log('Send message clicked');
        alert('Send message functionality');
    }

    logNote() {
        console.log('Log note clicked');
        alert('Log note functionality');
    }

    get filteredDocuments(): DocumentItem[] {
        const query = this.searchQuery.toLowerCase();
        return this.documents.filter(doc =>
            !query ||
            doc.name.toLowerCase().includes(query) ||
            doc.folder.toLowerCase().includes(query) ||
            doc.owner.toLowerCase().includes(query) ||
            doc.contact.toLowerCase().includes(query)
        );
    }
}
