const createBtnRequest = function () {
    let name;
    let ownerName;
    let ownerBalance;
    let newBankAccount;
    
    const processBtnRequest = function () {
        ownerBalance = 0;
        let output = document.getElementById('accName'); 
        let validName = false;
        ownerName = output.textContent;
        let validUserInput = true;
        
        if (ownerName !== ""){
            validName = true;
            newBankAccount = BankAccount(ownerName);
        }
    
        if (this.id === "nameBtn"){
            name = prompt("Please enter your Bank Accout Name", "Harry Potter");
            newBankAccount = BankAccount(name);
            validName = true;    
            displayOutput(name, 0);
        }
        
        if ( this.id === "depositBtn" && validName === true){
            let depositAmt = Number(prompt("Please enter the amount you want to deposit. Enter Only Numbers", "100"));
            validUserInput = checkUserInput(depositAmt);
            if (validUserInput === true){
                newBankAccount.depositAmount(depositAmt); 
                displayOutput(newBankAccount.getOwnerName(), newBankAccount.getBalance());   
            }       
        }
        
        if ( this.id === "withdrawalBtn" && validName===true){
            let withDrawAmt = Number(prompt("Please enter the amount you want to withdraw. Enter Only Numbers", "10" ));
            validUserInput = checkUserInput(withDrawAmt);
            if (validUserInput === true){
                newBankAccount.withdrawAmount(withDrawAmt);
                displayOutput(newBankAccount.getOwnerName(), newBankAccount.getBalance());
            }        
        }
        if( validName === false){
            alert("First Create account before any transaction");
        }
    };  
    return processBtnRequest;
};

displayOutput = function(name, amt){
    let output = document.getElementById('accName');  
    let balId  = document.getElementById('accBalance');  
    output.innerHTML = name; 
    balId.innerHTML  = amt;
}

checkUserInput = function(input){
    let isNum = true;
    isNum = /^\d+$/.test(input);
    if (isNum === false){
        alert("Must input numbers");
    }
    return isNum;
}
    

const BankAccount = function(accountName) {
    let newBalance = 0;
    let name = accountName;

    return {
        depositAmount: function(depositAmt){
            let balanceId = document.getElementById('accBalance');
            let balance = document.getElementById('accBalance').textContent;
            if ( balance !== ""){
                let num = parseFloat(balance);
                newBalance = depositAmt + num;
            } else {
                newBalance = depositAmt;
            }            
        },
        withdrawAmount: function(withdrawalAmt){
            let balanceId = document.getElementById('accBalance');
            let balance   = document.getElementById('accBalance').textContent;
            if ( balance !== ""){
                let num = parseFloat(balance);
                if ((num - withdrawalAmt) < 0) {
                    newBalance = num;
                    alert("Withdrawal not successful, Cannnot Over withdraw");            
                } else {
                    newBalance = num - withdrawalAmt;                 
                }
            } else {
                alert("Withdrawal not successful. Balance is Not Set!!");
            }       
        },
        getBalance: function(){
            return newBalance;
        },
        getOwnerName: function(){
            return name;
        }     
    };
};
    
window.addEventListener('load', () => {
    document.getElementById('nameBtn').onclick = createBtnRequest();
    document.getElementById('depositBtn').onclick = createBtnRequest();
    document.getElementById('withdrawalBtn').onclick = createBtnRequest();
});


        