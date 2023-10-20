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
      state.isLoading = false;
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
    converting(state, action) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, takeLoan, repayLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/converting" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    var newAmount = data.rates.USD;
    console.log(newAmount);
    dispatch({ type: "account/deposit", payload: newAmount });
  };
}

export default accountSlice.reducer;
