    const productDescription = document.getElementById("product-description");
    
    const sake3Button = document.getElementById("donate-3")
    const sake5Button = document.getElementById("donate-5")
    const sake10Button = document.getElementById("donate-10")

    const amountInput = document.getElementById("amount-input");
    const totalAmount = document.getElementById("total-amount");


    let sakeCount = 0;

    amountInput.addEventListener("input", ()=>{
        sakeCount = amountInput.value;
        upDateTotalAmount(); 
    })


    sake3Button.addEventListener("click", ()=>{
        sakeCount=3;
        amountInput.value=3;
        upDateTotalAmount();
    });

    sake5Button.addEventListener("click", ()=>{
        sakeCount=5;
        amountInput.value=5;
        upDateTotalAmount();
    });


    sake10Button.addEventListener("click", ()=>{
        sakeCount=10;
        amountInput.value=10;
        upDateTotalAmount();
    });


    const upDateTotalAmount = ()=>{
        const upDatedAmount = sakeCount * 50;
        totalAmount.innerText = upDatedAmount;

        
    };


 // MERCADOPAGO 

 const mercadopago = new MercadoPago("TEST-97d9e347-51e8-4c18-b173-739a7bb82e64", {
    locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  });
  
  document.getElementById("checkout-btn").addEventListener("click", function () {
    const orderData = {
      quantity: 1,
      description: productDescription.innerText,
      price: totalAmount.innerText,
    };
  
    fetch("http://localhost:8080/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (preference) {
        createCheckoutButton(preference.id);
      })
      .catch(function () {
        alert("Unexpected error");
      });
  });
  
  function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    const bricksBuilder = mercadopago.bricks();
  
    const renderComponent = async (bricksBuilder) => {
      if (window.checkoutButton) window.checkoutButton.unmount();
  
      await bricksBuilder.create(
        "wallet",
        "button-checkout", // class/id where the payment button will be displayed
        {
          initialization: {
            preferenceId: preferenceId, 
          },
          callbacks: {
            onError: (error) => console.error(error),
            onReady: () => {},
          },
        }
      );
    };
    window.checkoutButton = renderComponent(bricksBuilder);
  }
