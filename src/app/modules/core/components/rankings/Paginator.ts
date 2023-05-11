export class Paginator {
    currentPage: number = 1;
    itemsPerPage: number = 10;
    totalItems: number = 0;
  
    get totalPages(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  
    get pageRange(): [number, number] {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return [start, end];
    }
  
    setPage(pageNumber: number): void {
      this.currentPage = pageNumber;
    }
  }