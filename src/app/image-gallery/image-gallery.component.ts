import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface ImageItem {
    id: number;
    name: string;
    url: string;
    description: string;
    size: string;
    uploadedAt: Date;
    folderId: number;
    history?: ImageHistory[];
}

interface ImageHistory {
    id: number;
    version: string;
    action: 'created' | 'modified' | 'renamed' | 'moved' | 'shared' | 'downloaded';
    description: string;
    timestamp: Date;
    user: string;
    changes?: string;
}

@Component({
    selector: 'app-image-gallery',
    templateUrl: './image-gallery.component.html',
    styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
    folderName: string = '';
    folderId: number = 0;
    selectedImage: ImageItem | null = null;
    showLightbox = false;
    currentImageIndex = 0;
    viewMode: 'grid' | 'list' = 'grid';
    searchQuery = '';
    selectedImages: Set<number> = new Set();
    selectAll = false;
    showDetailsModal = false;
    showHistoryModal = false;
    selectedImageForHistory: ImageItem | null = null;

    // Mock images data for all folders
    images: ImageItem[] = [
        // Payroll Folder (ID: 1)
        {
            id: 1,
            name: 'Salary Structure Chart.png',
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            description: 'Employee salary structure and pay grades',
            size: '2.1 MB',
            uploadedAt: new Date('2024-01-10'),
            folderId: 1
        },
        {
            id: 2,
            name: 'Payroll Processing Flow.jpg',
            url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
            description: 'Monthly payroll processing workflow diagram',
            size: '1.8 MB',
            uploadedAt: new Date('2024-01-15'),
            folderId: 1
        },
        {
            id: 3,
            name: 'Tax Forms Template.png',
            url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=400&fit=crop',
            description: 'W-2 and tax form templates for employees',
            size: '1.5 MB',
            uploadedAt: new Date('2024-01-20'),
            folderId: 1
        },

        // HR Folder (ID: 2)
        {
            id: 4,
            name: 'Employee Headshots - John Doe.jpg',
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
            description: 'Professional headshot for employee directory',
            size: '2.3 MB',
            uploadedAt: new Date('2024-01-15'),
            folderId: 2,
            history: [
                {
                    id: 1,
                    version: '1.0',
                    action: 'created',
                    description: 'Initial upload',
                    timestamp: new Date('2024-01-15T09:30:00'),
                    user: 'Sarah Johnson',
                    changes: 'Original photo uploaded'
                },
                {
                    id: 2,
                    version: '1.1',
                    action: 'modified',
                    description: 'Color correction applied',
                    timestamp: new Date('2024-01-16T14:20:00'),
                    user: 'Mike Chen',
                    changes: 'Enhanced brightness and contrast'
                },
                {
                    id: 3,
                    version: '1.2',
                    action: 'shared',
                    description: 'Shared with HR team',
                    timestamp: new Date('2024-01-18T11:45:00'),
                    user: 'Sarah Johnson',
                    changes: 'Added to employee directory'
                }
            ]
        },
        {
            id: 5,
            name: 'Team Meeting Photo.jpg',
            url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
            description: 'Monthly team meeting in conference room',
            size: '3.1 MB',
            uploadedAt: new Date('2024-01-20'),
            folderId: 2
        },
        {
            id: 6,
            name: 'Office Building Exterior.jpg',
            url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
            description: 'Company headquarters building exterior',
            size: '4.2 MB',
            uploadedAt: new Date('2024-01-25'),
            folderId: 2
        },
        {
            id: 7,
            name: 'Employee ID Badge Template.png',
            url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop',
            description: 'Template for employee ID badges',
            size: '1.8 MB',
            uploadedAt: new Date('2024-02-01'),
            folderId: 2
        },
        {
            id: 8,
            name: 'HR Department Group Photo.jpg',
            url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
            description: 'HR department team photo for company website',
            size: '3.7 MB',
            uploadedAt: new Date('2024-02-05'),
            folderId: 2
        },

        // Stock Valuation Folder (ID: 3)
        {
            id: 9,
            name: 'Inventory Valuation Chart.png',
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            description: 'Current stock valuation and pricing analysis',
            size: '2.4 MB',
            uploadedAt: new Date('2024-01-12'),
            folderId: 3
        },
        {
            id: 10,
            name: 'Stock Analysis Dashboard.jpg',
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            description: 'Real-time stock valuation dashboard',
            size: '3.2 MB',
            uploadedAt: new Date('2024-01-18'),
            folderId: 3
        },
        {
            id: 11,
            name: 'Valuation Report Cover.png',
            url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=400&fit=crop',
            description: 'Monthly stock valuation report cover page',
            size: '1.9 MB',
            uploadedAt: new Date('2024-01-25'),
            folderId: 3
        },

        // Inventory Folder (ID: 4)
        {
            id: 12,
            name: 'Warehouse Layout Diagram.jpg',
            url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop',
            description: 'Current warehouse layout and storage zones',
            size: '2.8 MB',
            uploadedAt: new Date('2024-01-08'),
            folderId: 4
        },
        {
            id: 13,
            name: 'Inventory Count Sheet.png',
            url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop',
            description: 'Physical inventory count tracking sheet',
            size: '1.6 MB',
            uploadedAt: new Date('2024-01-14'),
            folderId: 4
        },
        {
            id: 14,
            name: 'Stock Level Monitoring.jpg',
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            description: 'Real-time inventory level monitoring system',
            size: '2.1 MB',
            uploadedAt: new Date('2024-01-22'),
            folderId: 4
        },

        // Sales Folder (ID: 5)
        {
            id: 15,
            name: 'Sales Performance Chart.png',
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            description: 'Monthly sales performance and targets',
            size: '2.3 MB',
            uploadedAt: new Date('2024-01-05'),
            folderId: 5,
            history: [
                {
                    id: 1,
                    version: '1.0',
                    action: 'created',
                    description: 'Initial chart creation',
                    timestamp: new Date('2024-01-05T08:00:00'),
                    user: 'Lisa Wang',
                    changes: 'Created monthly sales performance chart'
                },
                {
                    id: 2,
                    version: '1.1',
                    action: 'modified',
                    description: 'Updated with Q1 data',
                    timestamp: new Date('2024-01-10T16:30:00'),
                    user: 'Lisa Wang',
                    changes: 'Added Q1 sales figures and targets'
                },
                {
                    id: 3,
                    version: '1.2',
                    action: 'renamed',
                    description: 'Renamed for clarity',
                    timestamp: new Date('2024-01-12T10:15:00'),
                    user: 'David Kim',
                    changes: 'Renamed from "Q1 Sales Chart" to "Sales Performance Chart"'
                },
                {
                    id: 4,
                    version: '1.3',
                    action: 'shared',
                    description: 'Shared with management team',
                    timestamp: new Date('2024-01-15T14:00:00'),
                    user: 'Lisa Wang',
                    changes: 'Shared with executive team for review'
                }
            ]
        },
        {
            id: 16,
            name: 'Sales Team Photo.jpg',
            url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
            description: 'Sales department team group photo',
            size: '3.5 MB',
            uploadedAt: new Date('2024-01-12'),
            folderId: 5
        },
        {
            id: 17,
            name: 'Customer Meeting Room.jpg',
            url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
            description: 'Client presentation and meeting room setup',
            size: '2.7 MB',
            uploadedAt: new Date('2024-01-18'),
            folderId: 5
        },

        // Shared Folder (ID: 6)
        {
            id: 18,
            name: 'Brand 1 Logo Variations.png',
            url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
            description: 'Brand 1 logo in different formats and colors',
            size: '2.9 MB',
            uploadedAt: new Date('2024-01-09'),
            folderId: 6
        },
        {
            id: 19,
            name: 'Shared Resources Guide.jpg',
            url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
            description: 'Guide to shared company resources and tools',
            size: '1.8 MB',
            uploadedAt: new Date('2024-01-16'),
            folderId: 6
        },

        // Brand 2 Folder (ID: 7)
        {
            id: 20,
            name: 'Brand 2 Marketing Materials.png',
            url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
            description: 'Brand 2 marketing collateral and materials',
            size: '3.1 MB',
            uploadedAt: new Date('2024-01-11'),
            folderId: 7
        },
        {
            id: 21,
            name: 'Brand 2 Campaign Images.jpg',
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            description: 'Visual assets for Brand 2 marketing campaigns',
            size: '4.2 MB',
            uploadedAt: new Date('2024-01-19'),
            folderId: 7
        },
        {
            id: 22,
            name: 'Brand 2 Product Shots.jpg',
            url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
            description: 'Professional product photography for Brand 2',
            size: '3.8 MB',
            uploadedAt: new Date('2024-01-26'),
            folderId: 7
        },

        // Brand 1 Folder (ID: 8)
        {
            id: 23,
            name: 'Brand 1 Logo Guidelines.png',
            url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
            description: 'Brand 1 logo usage guidelines and standards',
            size: '2.5 MB',
            uploadedAt: new Date('2024-01-13'),
            folderId: 8
        },
        {
            id: 24,
            name: 'Brand 1 Product Catalog.jpg',
            url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
            description: 'Brand 1 product catalog and specifications',
            size: '3.6 MB',
            uploadedAt: new Date('2024-01-21'),
            folderId: 8
        },
        {
            id: 25,
            name: 'Brand 1 Social Media Assets.png',
            url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
            description: 'Social media graphics and templates for Brand 1',
            size: '2.2 MB',
            uploadedAt: new Date('2024-01-28'),
            folderId: 8
        },

        // Internal Folder (ID: 9)
        {
            id: 26,
            name: 'Company Policy Handbook.png',
            url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=400&fit=crop',
            description: 'Internal company policies and procedures',
            size: '2.7 MB',
            uploadedAt: new Date('2024-01-07'),
            folderId: 9
        },
        {
            id: 27,
            name: 'Internal Communication Template.jpg',
            url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
            description: 'Template for internal company communications',
            size: '1.9 MB',
            uploadedAt: new Date('2024-01-15'),
            folderId: 9
        },
        {
            id: 28,
            name: 'Employee Directory Photo.jpg',
            url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
            description: 'Company-wide employee directory with photos',
            size: '3.3 MB',
            uploadedAt: new Date('2024-01-23'),
            folderId: 9
        },

        // Products Folder (ID: 10)
        {
            id: 29,
            name: 'Product Line Overview.jpg',
            url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
            description: 'Complete product line overview and specifications',
            size: '4.1 MB',
            uploadedAt: new Date('2024-01-06'),
            folderId: 10
        },
        {
            id: 30,
            name: 'Product Development Process.png',
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            description: 'Product development workflow and stages',
            size: '2.8 MB',
            uploadedAt: new Date('2024-01-14'),
            folderId: 10
        },
        {
            id: 31,
            name: 'Product Testing Results.jpg',
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            description: 'Quality assurance and testing documentation',
            size: '2.5 MB',
            uploadedAt: new Date('2024-01-20'),
            folderId: 10
        },

        // Spreadsheet Folder (ID: 11)
        {
            id: 32,
            name: 'Financial Data Visualization.png',
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            description: 'Charts and graphs from financial spreadsheets',
            size: '1.7 MB',
            uploadedAt: new Date('2024-01-09'),
            folderId: 11
        },
        {
            id: 33,
            name: 'Budget Planning Chart.jpg',
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            description: 'Annual budget planning and allocation charts',
            size: '2.4 MB',
            uploadedAt: new Date('2024-01-17'),
            folderId: 11
        },
        {
            id: 34,
            name: 'Data Analysis Dashboard.png',
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            description: 'Business intelligence and data analysis screenshots',
            size: '2.9 MB',
            uploadedAt: new Date('2024-01-24'),
            folderId: 11
        },

        // Support Folder (ID: 12)
        {
            id: 35,
            name: 'Customer Support Team.jpg',
            url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
            description: 'Customer support team group photo',
            size: '3.2 MB',
            uploadedAt: new Date('2024-01-11'),
            folderId: 12
        },
        {
            id: 36,
            name: 'Support Process Flow.png',
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            description: 'Customer support workflow and escalation process',
            size: '2.1 MB',
            uploadedAt: new Date('2024-01-18'),
            folderId: 12
        },
        {
            id: 37,
            name: 'Help Desk Setup.jpg',
            url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
            description: 'Customer support help desk and call center setup',
            size: '2.6 MB',
            uploadedAt: new Date('2024-01-25'),
            folderId: 12
        },

        // Marketing Folder (ID: 13)
        {
            id: 38,
            name: 'Marketing Campaign Assets.jpg',
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            description: 'Digital marketing campaign materials and assets',
            size: '4.3 MB',
            uploadedAt: new Date('2024-01-08'),
            folderId: 13
        },
        {
            id: 39,
            name: 'Social Media Graphics.png',
            url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop',
            description: 'Social media posts and promotional graphics',
            size: '2.8 MB',
            uploadedAt: new Date('2024-01-16'),
            folderId: 13
        },
        {
            id: 40,
            name: 'Marketing Analytics Dashboard.jpg',
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            description: 'Marketing performance metrics and analytics',
            size: '3.1 MB',
            uploadedAt: new Date('2024-01-23'),
            folderId: 13
        },

        // Finance Folder (ID: 14)
        {
            id: 41,
            name: 'Financial Reports Cover.png',
            url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=400&fit=crop',
            description: 'Quarterly financial reports and statements',
            size: '2.2 MB',
            uploadedAt: new Date('2024-01-10'),
            folderId: 14
        },
        {
            id: 42,
            name: 'Budget Allocation Chart.jpg',
            url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            description: 'Department budget allocation and spending analysis',
            size: '2.7 MB',
            uploadedAt: new Date('2024-01-17'),
            folderId: 14
        },
        {
            id: 43,
            name: 'Finance Team Photo.jpg',
            url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
            description: 'Finance department team group photo',
            size: '3.4 MB',
            uploadedAt: new Date('2024-01-24'),
            folderId: 14
        }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.folderName = params['folderName'] || 'Unknown Folder';
            this.folderId = parseInt(params['folderId']) || 0;
        });
    }

    get filteredImages(): ImageItem[] {
        const query = this.searchQuery.toLowerCase();
        return this.images.filter(img =>
            img.folderId === this.folderId &&
            (!query || img.name.toLowerCase().includes(query) || img.description.toLowerCase().includes(query))
        );
    }

    openLightbox(image: ImageItem) {
        this.selectedImage = image;
        this.currentImageIndex = this.filteredImages.findIndex(img => img.id === image.id);
        this.showLightbox = true;
    }

    closeLightbox() {
        this.showLightbox = false;
        this.selectedImage = null;
    }

    nextImage() {
        if (this.currentImageIndex < this.filteredImages.length - 1) {
            this.currentImageIndex++;
            this.selectedImage = this.filteredImages[this.currentImageIndex];
        }
    }

    previousImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
            this.selectedImage = this.filteredImages[this.currentImageIndex];
        }
    }

    setViewMode(mode: 'grid' | 'list') {
        this.viewMode = mode;
    }

    goBack() {
        this.router.navigate(['/']);
    }

    formatFileSize(bytes: string): string {
        return bytes;
    }

    formatDate(date: Date): string {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    }

    toggleImageSelection(imageId: number) {
        if (this.selectedImages.has(imageId)) {
            this.selectedImages.delete(imageId);
        } else {
            this.selectedImages.add(imageId);
        }
        this.updateSelectAllState();
    }

    toggleSelectAll() {
        this.selectAll = !this.selectAll;
        if (this.selectAll) {
            this.filteredImages.forEach(image => this.selectedImages.add(image.id));
        } else {
            this.selectedImages.clear();
        }
    }

    updateSelectAllState() {
        this.selectAll = this.filteredImages.length > 0 &&
            this.filteredImages.every(image => this.selectedImages.has(image.id));
    }

    isImageSelected(imageId: number): boolean {
        return this.selectedImages.has(imageId);
    }

    getSelectedCount(): number {
        return this.selectedImages.size;
    }

    clearSelection() {
        this.selectedImages.clear();
        this.selectAll = false;
    }

    // Action methods
    actionDownload() {
        const selectedImageIds = Array.from(this.selectedImages);
        console.log('Downloading images:', selectedImageIds);
        alert(`Downloading ${selectedImageIds.length} selected images`);
    }

    actionShare() {
        const selectedImageIds = Array.from(this.selectedImages);
        console.log('Sharing images:', selectedImageIds);
        alert(`Sharing ${selectedImageIds.length} selected images`);
    }

    actionMove() {
        const selectedImageIds = Array.from(this.selectedImages);
        console.log('Moving images:', selectedImageIds);
        alert(`Moving ${selectedImageIds.length} selected images to another folder`);
    }

    actionCopy() {
        const selectedImageIds = Array.from(this.selectedImages);
        console.log('Copying images:', selectedImageIds);
        alert(`Copying ${selectedImageIds.length} selected images`);
    }

    actionDelete() {
        const selectedImageIds = Array.from(this.selectedImages);
        if (confirm(`Are you sure you want to delete ${selectedImageIds.length} selected images?`)) {
            console.log('Deleting images:', selectedImageIds);
            // Remove selected images from the images array
            this.images = this.images.filter(img => !this.selectedImages.has(img.id));
            this.clearSelection();
            alert(`${selectedImageIds.length} images deleted successfully`);
        }
    }

    actionArchive() {
        const selectedImageIds = Array.from(this.selectedImages);
        console.log('Archiving images:', selectedImageIds);
        alert(`Archiving ${selectedImageIds.length} selected images`);
    }

    actionRename() {
        const selectedImageIds = Array.from(this.selectedImages);
        console.log('Renaming images:', selectedImageIds);
        alert(`Renaming ${selectedImageIds.length} selected images`);
    }

    actionProperties() {
        const selectedImageIds = Array.from(this.selectedImages);
        console.log('Showing properties for images:', selectedImageIds);
        alert(`Showing properties for ${selectedImageIds.length} selected images`);
    }

    actionExport() {
        const selectedImageIds = Array.from(this.selectedImages);
        console.log('Exporting images:', selectedImageIds);
        alert(`Exporting ${selectedImageIds.length} selected images`);
    }

    actionPrint() {
        const selectedImageIds = Array.from(this.selectedImages);
        console.log('Printing images:', selectedImageIds);
        alert(`Printing ${selectedImageIds.length} selected images`);
    }

    actionDetails() {
        this.showDetailsModal = true;
    }

    closeDetailsModal() {
        this.showDetailsModal = false;
    }

    getSelectedImages(): ImageItem[] {
        return this.images.filter(img => this.selectedImages.has(img.id));
    }

    getTotalSize(): string {
        const selectedImages = this.getSelectedImages();
        if (selectedImages.length === 0) return '0 MB';

        // Parse sizes and calculate total
        let totalMB = 0;
        selectedImages.forEach(img => {
            const sizeStr = img.size.replace(' MB', '');
            const size = parseFloat(sizeStr);
            if (!isNaN(size)) {
                totalMB += size;
            }
        });

        return totalMB.toFixed(1) + ' MB';
    }

    getDateRange(): string {
        const selectedImages = this.getSelectedImages();
        if (selectedImages.length === 0) return 'No selection';

        const dates = selectedImages.map(img => new Date(img.uploadedAt));
        const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
        const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));

        if (minDate.getTime() === maxDate.getTime()) {
            return this.formatDate(minDate);
        }

        return `${this.formatDate(minDate)} - ${this.formatDate(maxDate)}`;
    }

    getFileTypes(): string {
        const selectedImages = this.getSelectedImages();
        if (selectedImages.length === 0) return 'No selection';

        const types = new Set(selectedImages.map(img => {
            const ext = img.name.split('.').pop()?.toUpperCase();
            return ext || 'Unknown';
        }));

        return Array.from(types).join(', ');
    }

    // History methods
    showImageHistory(image: ImageItem) {
        this.selectedImageForHistory = image;
        this.showHistoryModal = true;
    }

    closeHistoryModal() {
        this.showHistoryModal = false;
        this.selectedImageForHistory = null;
    }

    getActionIcon(action: string): string {
        switch (action) {
            case 'created': return '➕';
            case 'modified': return '✏️';
            case 'renamed': return '🏷️';
            case 'moved': return '📁';
            case 'shared': return '🔗';
            case 'downloaded': return '⬇️';
            default: return '📝';
        }
    }

    getActionColor(action: string): string {
        switch (action) {
            case 'created': return 'success';
            case 'modified': return 'primary';
            case 'renamed': return 'info';
            case 'moved': return 'warning';
            case 'shared': return 'secondary';
            case 'downloaded': return 'dark';
            default: return 'light';
        }
    }

    formatHistoryDate(date: Date): string {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
}
