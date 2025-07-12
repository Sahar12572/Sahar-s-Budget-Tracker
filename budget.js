document.addEventListener("DOMContentLoaded", () => {
  if (
    !sessionStorage.getItem("incomes") ||
    !sessionStorage.getItem("expenses")
  ) {
    initializeBudget();
  }
  displayBudget();
});

function initializeBudget() {
  let incomes = [
    { name: "Salary", amount: 4000, recurring: true },
    { name: "Freelance", amount: 1200, recurring: false },
    { name: "Investments", amount: 500, recurring: true },
    { name: "Rental Income", amount: 800, recurring: true },
    { name: "Side Hustle", amount: 300, recurring: false },
  ];

  let expenses = [
    { name: "Rent", amount: 1200, recurring: true },
    { name: "Groceries", amount: 350, recurring: true },
    { name: "Transport", amount: 150, recurring: true },
    { name: "Entertainment", amount: 200, recurring: false },
    { name: "Internet", amount: 80, recurring: true },
  ];

  sessionStorage.setItem("incomes", JSON.stringify(incomes));
  sessionStorage.setItem("expenses", JSON.stringify(expenses));
}

function displayBudget() {
  let incomes = JSON.parse(sessionStorage.getItem("incomes")) || [];
  let expenses = JSON.parse(sessionStorage.getItem("expenses")) || [];

  let incomeList = document.getElementById("income-list");
  let expenseList = document.getElementById("expense-list");
  incomeList.innerHTML = "";
  expenseList.innerHTML = "";

  incomes.forEach((income, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${income.name}: $${income.amount} (${
      income.recurring ? "Recurring" : "One-time"
    }) 
                      <button onclick="removeIncome(${index})">❌</button>`;
    incomeList.appendChild(li);
  });

  expenses.forEach((expense, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${expense.name}: $${expense.amount} (${
      expense.recurring ? "Recurring" : "One-time"
    }) 
                      <button onclick="removeExpense(${index})">❌</button>`;
    expenseList.appendChild(li);
  });

  updateDisposableIncome();
}

function addIncome() {
  let name = document.getElementById("income-name").value;
  let amount = document.getElementById("income-amount").value;
  let recurring = document.getElementById("income-recurring").value === "true";

  if (name && amount) {
    let incomes = JSON.parse(sessionStorage.getItem("incomes")) || [];
    incomes.push({ name, amount: Number(amount), recurring });
    sessionStorage.setItem("incomes", JSON.stringify(incomes));

    document.getElementById("income-name").value = "";
    document.getElementById("income-amount").value = "";
    displayBudget();
  }
}

function addExpense() {
  let name = document.getElementById("expense-name").value;
  let amount = document.getElementById("expense-amount").value;
  let recurring = document.getElementById("expense-recurring").value === "true";

  if (name && amount) {
    let expenses = JSON.parse(sessionStorage.getItem("expenses")) || [];
    expenses.push({ name, amount: Number(amount), recurring });
    sessionStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
    displayBudget();
  }
}

function removeIncome(index) {
  let incomes = JSON.parse(sessionStorage.getItem("incomes"));
  incomes.splice(index, 1);
  sessionStorage.setItem("incomes", JSON.stringify(incomes));
  displayBudget();
}

function removeExpense(index) {
  let expenses = JSON.parse(sessionStorage.getItem("expenses"));
  expenses.splice(index, 1);
  sessionStorage.setItem("expenses", JSON.stringify(expenses));
  displayBudget();
}

function updateDisposableIncome() {
  let incomes = JSON.parse(sessionStorage.getItem("incomes")) || [];
  let expenses = JSON.parse(sessionStorage.getItem("expenses")) || [];

  let totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  let totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  let disposableIncome = totalIncome - totalExpenses;

  document.getElementById(
    "disposable-income"
  ).innerText = `Disposable Income: $${disposableIncome}`;
}

function saveMoney() {
  let savings = document.getElementById("savings-amount").value;
  let disposableIncome = parseInt(
    document.getElementById("disposable-income").innerText.split("$")[1]
  );

  if (savings && savings > 0 && savings <= disposableIncome) {
    let remainingIncome = disposableIncome - savings;
    alert(
      `You have saved $${savings}. Remaining disposable income: $${remainingIncome}`
    );
    document.getElementById(
      "disposable-income"
    ).innerText = `Disposable Income: $${remainingIncome}`;
  } else {
    alert("Invalid savings amount!");
  }
}
