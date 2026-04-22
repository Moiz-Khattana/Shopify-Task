(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    const widthSelect     = document.getElementById('curtain-width-select');
    const dropSelect      = document.getElementById('curtain-drop-select');
    const priceDisplay    = document.getElementById('curtain-price-display');
    const addToCartBtn    = document.getElementById('curtain-atc-btn');
    const variantIdInput  = document.getElementById('curtain-variant-id');
    const errorMsg        = document.getElementById('curtain-error');
    if (!widthSelect || !dropSelect || !priceDisplay || !addToCartBtn) return;
    const variants    = window.curtainData.variants; 
    const currencySymbol = window.curtainData.currency; 
    function updatePrice() {
      errorMsg.style.display = 'none';
      const widthOption  = widthSelect.options[widthSelect.selectedIndex];
      const selectedDrop = dropSelect.value;
      if (!widthOption.value || !selectedDrop) {
        priceDisplay.textContent = 'Select width and drop to see price';
        priceDisplay.classList.add('placeholder');
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.disabled = true;
        variantIdInput.value = '';
        return;
      }
      const panelCount = parseInt(widthOption.getAttribute('data-panels'), 10);
      const panelLabel = panelCount === 1
        ? '1 Panel'
        : panelCount + ' Panels';
      const targetTitle = panelLabel + ' / ' + selectedDrop;
      const matchedVariant = variants.find(function (v) {
        return v.title === targetTitle;
      });
      if (matchedVariant && matchedVariant.available) {
        const priceInPounds = (matchedVariant.price / 100).toFixed(2);
        priceDisplay.textContent = currencySymbol + priceInPounds;
        priceDisplay.classList.remove('placeholder');
        addToCartBtn.textContent = 'Add to Cart — ' + currencySymbol + priceInPounds;
        addToCartBtn.disabled = false;
        variantIdInput.value = matchedVariant.id;
      } else if (matchedVariant && !matchedVariant.available) {
        priceDisplay.textContent = 'Out of Stock';
        priceDisplay.classList.remove('placeholder');
        addToCartBtn.textContent = 'Out of Stock';
        addToCartBtn.disabled = true;
        variantIdInput.value = '';

      } else {
        priceDisplay.textContent = '';
        errorMsg.style.display = 'block';
        addToCartBtn.textContent = 'Add to Cart';
        addToCartBtn.disabled = true;
        variantIdInput.value = '';
      }
    }
    widthSelect.addEventListener('change', updatePrice);
    dropSelect.addEventListener('change', updatePrice);
    updatePrice();

  });

})();