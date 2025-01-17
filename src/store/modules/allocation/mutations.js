export default {
  SET_LIST_ALLOCATION: (state, data) => {
    state.listAllocation = data
  },
  SET_TOTAL_LIST_ALLOCATION: (state, data) => {
    state.totalListAllocation = data
  },
  SET_TOTAL_LIST_ALLOCATION_PAGE: (state, data) => {
    state.totalListAllocationPage = data
  },
  SET_TOTAL_ALLOCATION: (state, data) => {
    state.totalAllocation = data
  },
  SET_TOTAL_SUCCESS: (state, data) => {
    state.totalSuccess = data
  },
  SET_TOTAL_DRAFT: (state, data) => {
    state.totalDraft = data
  },
  SET_DETAIL_ALLOCATION_INFO: (state, data) => {
    state.detailAllocationInfo = data
  },
  SET_DETAIL_ALLOCATION_DATA: (state, data) => {
    state.detailAllocationData = data
  }
}
