import StateModule from '../module';

class PaginationState extends StateModule {
  initState() {
    return {
      totalPages: 1,
      currentPage: 1
    };
  }

  setCurrentPage(pageNumber) {
    this.setState(
      {
        ...this.getState(),
        currentPage: pageNumber
      },
      'назначение текущей страницы'
    );
  }

  setTotalPages(total) {
    this.setState(
      {
        ...this.getState(),
        totalPages: total
      },
      'назначение общего количества страниц'
    );
  }
}

export default PaginationState;
