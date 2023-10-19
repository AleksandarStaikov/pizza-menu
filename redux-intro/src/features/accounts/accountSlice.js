import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = {
  balance: 0,
  loan: 0,
  loanReason: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    takeLoan: {
      prepare(loanAmount, loanPurpose) {
        return {
          payload: { loanAmount, loanPurpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = Number(action.payload.loanAmount);
        state.loanReason = action.payload.loanPurpose;
        state.balance += Number(action.payload.loanAmount);
      },
    },
    repayLoan(state, action) {
      if (state.loan === 0) return;

      state.loanReason = "";
      state.balance -= state.loan;
      state.loan = 0;
    },
  },
});

export const { deposit, withdraw, takeLoan, repayLoan } = accountSlice.actions;

export default accountSlice.reducer;
