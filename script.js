document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseDateInput = document.getElementById("expense-date");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let totalAmount = calculateTotal();
    renderExpenses();
    updateTotal();

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value.trim());
        const date = expenseDateInput.value;

        if (name !== "" && !isNaN(amount) && amount > 0 && date !== "") {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount,
                date: date
            };
            expenses.push(newExpense);
            saveExpensesToLocal();
            renderExpenses();
            updateTotal();

            // Clear inputs
            expenseNameInput.value = "";
            expenseAmountInput.value = "";
            expenseDateInput.value = "";
        }
    });

    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach((expense) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <div>
                    <strong>${expense.name}</strong>
                    <small>${expense.date}</small>
                </div>
                <div>
                    $${expense.amount.toFixed(2)}
                    <button data-id="${expense.id}">❌</button>
                </div>
            `;
            expenseList.appendChild(li);
        });
    }

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    function saveExpensesToLocal() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }

    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const expenseId = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== expenseId);
            saveExpensesToLocal();
            renderExpenses();
            updateTotal();
        }
    });
});
