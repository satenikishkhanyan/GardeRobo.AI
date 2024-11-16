var xhr = new XMLHttpRequest();
let mainContainer = document.querySelector('.main-container')

xhr.open('POST', 'https://api.modatech.ru/api/v3/widget/get_looks_for_products/', true);

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', 'Bearer dc0065c5534b4923bcfce1382084e485');
xhr.setRequestHeader('x-api-key', 'e0400896365f4738bdce8933e5f31968');

var blocks;
var similiarItems;


xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            blocks = response.blocks;

            let headerContainer = document.createElement('div');
            headerContainer.classList.add('header-container');
            mainContainer.appendChild(headerContainer);

            let productItemTitle = document.createElement('p');
            productItemTitle.classList.add('product-item-title');
            headerContainer.appendChild(productItemTitle);
            let name = blocks.forEach((firstName) => {
                productItemTitle.innerHTML = firstName.name;
            });

            let productsContainer = document.createElement('div');
            productsContainer.classList.add('products-container');
            mainContainer.appendChild(productsContainer);

            let productsContainerLeft = document.createElement('div');
            productsContainerLeft.classList.add('products-container-left');
            productsContainer.appendChild(productsContainerLeft);

            let leftContainerCollage = document.createElement('div');
            leftContainerCollage.className = 'left-container-collage';
            productsContainerLeft.appendChild(leftContainerCollage);

            blocks.forEach((item, index) => {
                let collageSlider = document.createElement('div');
                collageSlider.classList.add('collage-slider');
                leftContainerCollage.appendChild(collageSlider);
                collageSlider.setAttribute('data-look-id', item.look_id);

                item.products.forEach((product) => {
                    let collageSliderImage = document.createElement('img');
                    collageSlider.appendChild(collageSliderImage);
                    collageSliderImage.setAttribute('data-id', product.wareId);
                    collageSliderImage.classList.add('items');
                    collageSliderImage.setAttribute('data-category-group', product.category_group);
                    if (product.collage_data) {
                        collageSliderImage.src = product.picture;
                        collageSliderImage.style.width = product.collage_data.width + '%';
                        collageSliderImage.style.height = product.collage_data.height + '%';
                        collageSliderImage.style.top = product.collage_data.top + '%';
                        collageSliderImage.style.left = product.collage_data.left + '%';
                        collageSliderImage.style.zIndex = product.collage_data.zIndex + '%';
                    };
                });

                // showSlides(index, item);

            });

            let looksCategory = document.createElement('div');
            looksCategory.classList.add('looks-category');
            productsContainerLeft.appendChild(looksCategory);

            let newStyle = document.createElement('div');
            newStyle.classList.add('new-style');
            looksCategory.appendChild(newStyle);

            let plusIcon = document.createElement('button');
            plusIcon.classList.add('plus-icon');
            plusIcon.innerHTML = '<i class="fas fa-plus"></i>';
            newStyle.appendChild(plusIcon);

            let plusText = document.createElement('p');
            plusText.classList.add('plus-text');
            plusText.innerHTML = 'New style';
            newStyle.appendChild(plusText);

            blocks.forEach((item) => {
                let looksCategoryCollage = document.createElement('div');
                looksCategoryCollage.classList.add('look-category-collage');
                looksCategory.appendChild(looksCategoryCollage);
                looksCategoryCollage.setAttribute('data-look-id', item.look_id);

                item.products.forEach(product => {
                    let looksCategoryCollageImages = document.createElement('img');
                    looksCategoryCollageImages.classList.add('picture');
                    looksCategoryCollageImages.setAttribute('data-id', product.wareId);
                    looksCategoryCollageImages.setAttribute('data-category-group', product.category_group);
                    looksCategoryCollageImages.src = product.picture;

                    looksCategoryCollage.appendChild(looksCategoryCollageImages);
                    if (product.collage_data) {
                        looksCategoryCollageImages.style.width = product.collage_data.width + '%';
                        looksCategoryCollageImages.style.height = product.collage_data.height + '%';
                        looksCategoryCollageImages.style.top = product.collage_data.top + '%';
                        looksCategoryCollageImages.style.left = product.collage_data.left + '%';
                        looksCategoryCollageImages.style.zIndex = product.collage_data.zIndex + '%';
                    }
                })
            });


            let prevButton = document.createElement('button');
            prevButton.classList.add('prev');
            leftContainerCollage.appendChild(prevButton);
            let prevIcon = document.createElement('img');
            prevButton.appendChild(prevIcon);
            prevIcon.src = 'arrowL.svg';
            prevButton.addEventListener('click', function () {
                plusSlides(-1);
            });

            let nextButton = document.createElement('button');
            nextButton.classList.add('next');
            leftContainerCollage.appendChild(nextButton);
            let nextIcon = document.createElement('img');
            nextButton.appendChild(nextIcon);
            nextIcon.src = 'arrowR.svg';
            nextButton.addEventListener('click', function () {
                plusSlides(1);
            });

            let rightContainer = document.createElement('div');
            rightContainer.className = 'right-container';
            productsContainer.appendChild(rightContainer);

            let lists = document.querySelectorAll('.look-category-collage');
            let slides = document.querySelectorAll('.collage-slider');

            lists.forEach((element, index) => {
                element.addEventListener('click', function () {
                    slides.forEach(slide => slide.classList.remove('active'));
                    slides[index].classList.add('active');
                    rightContainer.innerHTML = '';
                    // changeRightItems(blocks[index], rightContainer);
                    slideIndex = index;
                    showSlides(slideIndex, blocks);
                });
            });

            if (slides.length > 0) {
                slides[0].classList.add('active');
            }

            showSlides(0, blocks);
        } else {
            console.error('Error: ' + xhr.status);
        }
    }

};

var data = JSON.stringify({ page_type: "product", payload: "eyJibG9ja3MiOiBbeyJ0eXBlIjogImxvb2tzIiwgImxvb2tfaWQiOiAxMDkzNDEsICJwcm9kdWN0c19pZHMiOiBbMTYzMjI3MSwgMTU4OTcyOCwgMTYzMjM5MCwgMTYwNjk4MSwgMTU0MTM5OF0sICJtYWluX3Byb2R1Y3RfaWQiOiAxNjMyMjcxfSwgeyJ0eXBlIjogImxvb2tzIiwgImxvb2tfaWQiOiAxMDkxMTIsICJwcm9kdWN0c19pZHMiOiBbMTU0MTk1MywgMTU5MjEyOSwgMTYyMTM3NiwgMTU0MTM0NywgMTU0MDgxMCwgMTU0MjA2Nl0sICJtYWluX3Byb2R1Y3RfaWQiOiAxNTkyMTI5fSwgeyJ0eXBlIjogImxvb2tzIiwgImxvb2tfaWQiOiAxMDg5NjksICJwcm9kdWN0c19pZHMiOiBbMTU5NzMxNCwgMTU0MTc3MiwgMTU0NDE1NSwgMTYyMDM5NSwgMTYwNjk4MywgMTU0Nzc3OF0sICJtYWluX3Byb2R1Y3RfaWQiOiAxNTQ3Nzc4fSwgeyJ0eXBlIjogImxvb2tzIiwgImxvb2tfaWQiOiAxMDkxNTYsICJwcm9kdWN0c19pZHMiOiBbMTU0MjA0NywgMTYzMjI3MSwgMTU0MDQ5NywgMTU0MTkyNywgMTYyMTQ0NSwgMTU0MTg3MywgMTU0MDc0NiwgMTU0MTkzMV0sICJtYWluX3Byb2R1Y3RfaWQiOiAxNjMyMjcxfSwgeyJ0eXBlIjogImxvb2tzIiwgImxvb2tfaWQiOiA4MTI5NCwgInByb2R1Y3RzX2lkcyI6IFsxNTQxNzQ1LCAxNTkyMTI5LCAxNjIxNDQ1LCAxNTQwNjU3LCAxNTQyMDY2XSwgIm1haW5fcHJvZHVjdF9pZCI6IDE1OTIxMjl9LCB7InR5cGUiOiAibG9va3MiLCAibG9va19pZCI6IDgxMzM0LCAicHJvZHVjdHNfaWRzIjogWzE2MjAzNTIsIDE1NDEzMDgsIDE2MjAzOTYsIDE2MDY5ODMsIDE1NDc3NzhdLCAibWFpbl9wcm9kdWN0X2lkIjogMTU0Nzc3OH1dLCAidmVuZG9yX2lkIjogMjAwLCAiY3VzdG9tIjogImVtYWlsIn0_" });
xhr.send(data);


function showSlides(n) {
    let sliderItems = document.querySelectorAll('.collage-slider');
    let collageItems = document.querySelectorAll('.look-category-collage');

    if (n >= sliderItems.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = sliderItems.length - 1;
    }

    sliderItems.forEach(slide => {
        slide.classList.remove('active');
    });

    sliderItems[slideIndex].classList.add('active');

    collageItems.forEach((collage, index) => {
        collage.style.border = '1px solid #DADFE9';

        if (index === slideIndex) {
            collage.style.border = '1px solid black';
        }
    });

    let rightContainer = document.querySelector('.right-container');

    rightContainer.innerHTML = ' ';
    changeRightItems(blocks[slideIndex], rightContainer);
}

var slideIndex = 0;
//showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}


function drawRightProduct(product, containerEl, lookId, similiarItems) {
    containerEl.innerHTML = ' ';

    let rightBoxesImage = document.createElement('div');
    rightBoxesImage.classList.add('right-boxes-image');
    containerEl.appendChild(rightBoxesImage);

    let rightProductsPictures = document.createElement('img');
    rightProductsPictures.classList.add('right-products-images');
    rightProductsPictures.setAttribute('data-id', product.wareId || product.id);
    rightProductsPictures.src = product.picture;
    rightBoxesImage.appendChild(rightProductsPictures);


    let rightBoxDots = document.createElement('div');
    rightBoxDots.classList.add('right-box-dots');
    rightBoxDots.setAttribute('data-id', product.id);

    rightBoxesImage.appendChild(rightBoxDots);
    for (let i = 0; i < 6; i++) {
        let dots = document.createElement('div');
        dots.classList.add('dot');
        if (i == 0) {
            dots.classList.add('active');
        }
        rightBoxDots.appendChild(dots);
    }

    let rightBoxChange = document.createElement('div');
    rightBoxChange.classList.add('right-box-change');
    rightBoxesImage.appendChild(rightBoxChange);
    rightBoxChange.addEventListener('click', function () {
        getSimiliars(containerEl.getAttribute('data-id'), containerEl, lookId, product);
    })

    let changeIcon = document.createElement('img');
    changeIcon.classList.add('change-icon');
    rightBoxChange.appendChild(changeIcon);
    changeIcon.src = 'change.svg';

    let changeText = document.createElement('p');
    changeText.classList.add('change-text');
    rightBoxChange.appendChild(changeText);
    changeText.innerHTML = 'Change';

    let rightProductsInfo = document.createElement('div');
    rightProductsInfo.classList.add('right-products-info');
    containerEl.appendChild(rightProductsInfo);

    let rightProductsName = document.createElement('p');
    rightProductsName.classList.add('right-products-name');
    rightProductsInfo.appendChild(rightProductsName);
    rightProductsName.setAttribute('data-default-name', product.wareId);
    rightProductsName.innerHTML = product.name;

    let apranqneriGin = document.createElement('p');
    apranqneriGin.classList.add('right-products-price');
    rightProductsInfo.appendChild(apranqneriGin);
    apranqneriGin.setAttribute('data-default-price', product.wareId);
    apranqneriGin.innerHTML = 'AMD' + ' ' + product.price;

    let showMore = document.createElement('p');
    showMore.classList.add('right-products-show-more');
    rightProductsInfo.appendChild(showMore);
    showMore.innerHTML = 'Show more';

    let sizeSelectBox = document.createElement('div');
    sizeSelectBox.classList.add('size-select-box');
    rightProductsInfo.append(sizeSelectBox);

    let inputSelect = document.createElement('select');
    inputSelect.classList.add('right-products-select');
    sizeSelectBox.appendChild(inputSelect);

    let selectArrow = document.createElement('div');
    selectArrow.classList.add('select-arrow');
    sizeSelectBox.appendChild(selectArrow);
    selectArrow.innerHTML = '<i class="fas fa-chevron-down"></i>';

    let defaultOption = document.createElement('option');
    defaultOption.classList.add('options');
    defaultOption.textContent = 'Select size';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    inputSelect.appendChild(defaultOption);

    product.sizes.forEach((size) => {
        let options = document.createElement('option');
        options.classList.add('options');
        inputSelect.appendChild(options);
        options.innerHTML = size.name;
    });

    let buttons = document.createElement('div');
    buttons.classList.add('right-products-buttons');
    rightProductsInfo.appendChild(buttons);
    // buttons.setAttribute('data-id', lookId);

    let addButton = document.createElement('button');
    addButton.classList.add('right-products-add-button');
    buttons.appendChild(addButton);
    addButton.disabled = true;
    addButton.innerHTML = 'Disabled';

    let favorite = document.createElement('button');
    favorite.classList.add('right-products-favorite');
    buttons.appendChild(favorite);
    favorite.setAttribute('data-id', product.wareId || product.id);
    favorite.innerHTML = '<img src="favorite.svg"></img>' + '<br>' + '<p>Favorites</p>';

    favorite.addEventListener('click', function () {
        let favoriteId = this.getAttribute('data-id');

        if (this.hasAttribute('active')) {
            favorite.innerHTML = '<img src="favorite.svg"></img>' + '<br>' + '<p>Favorites</p>';
            this.removeAttribute('active');
            localStorage.setItem(favoriteId, 'false');
        } else {
            favorite.innerHTML = '<img src="coloredHeart.svg"></img>' + '<br>' + '<p>Favorites</p>';
            this.setAttribute('active', 'true');
            localStorage.setItem(favoriteId, 'true');
        }
    }); 

    let icon = document.createElement('div');
    icon.classList.add('right-products-icon');
    buttons.appendChild(icon);

    let deleteIcon = document.createElement('img');
    deleteIcon.classList.add('delete-icon');
    icon.appendChild(deleteIcon);
    deleteIcon.src = 'delete.svg';

    inputSelect.addEventListener('change', function () {
        if (inputSelect.value !== 'Select size') {
            addButton.disabled = false;
            addButton.innerHTML = 'Add to Cart';
        } else {
            addButton.disabled = true;
            addButton.innerHTML = 'Disabled';
        }
    });
}

// function loadFavoriteState(favoriteId) {
//     let isFavorited = localStorage.getItem(favoriteId);
//     if (isFavorited === 'true') {
//         favorite.innerHTML = '<img src="coloredHeart.svg"></img>' + '<br>' + '<p>Favorites</p>';
//         favorite.setAttribute('active', 'true');
//     } else {
//         favorite.innerHTML = '<img src="favorite.svg"></img>' + '<br>' + '<p>Favorites</p>';
//         favorite.removeAttribute('active');
//     }
// }

function changeRightItems(look, rightContainer) {

    let rightContainerBoxes = document.createElement('div');
    rightContainerBoxes.classList.add('right-container-boxes');
    rightContainerBoxes.setAttribute('data-look-id', look.look_id);
    rightContainer.appendChild(rightContainerBoxes);

    look.products.forEach((product) => {
        if (product.collage_data) {
            let rightContainerProduct = document.createElement('div');
            rightContainerProduct.classList.add('right-container-products');
            rightContainerBoxes.appendChild(rightContainerProduct);
            rightContainerProduct.setAttribute('data-id', product.wareId);
            rightContainerProduct.setAttribute('data-look-id', look.look_id);
            drawRightProduct(product, rightContainerProduct, look.look_id);
        }
    })
    
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        console.log(`Key: ${key}, Value: ${value}`);
    }
}

function getSimiliars(productId, containerEl, lookId, product, wareId) {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://api.modatech.ru/api/v3/widget/get_similar_products/', true);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer dc0065c5534b4923bcfce1382084e485');
    xhr.setRequestHeader('x-api-key', 'e0400896365f4738bdce8933e5f31968');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let response = JSON.parse(xhr.responseText);
                similiarItems = response.products;

                let selectedProduct;
                let right = document.querySelectorAll('.right-container-products');

                right.forEach(productItem => {
                    if (productItem.getAttribute('data-id') == productId) {
                        selectedProduct = productItem;
                    }
                })

                let changeRightItems = document.createElement('div');
                changeRightItems.classList.add('change-right-items');
                selectedProduct.appendChild(changeRightItems);

                similiarItems.forEach((item) => {
                    if (selectedProduct) {

                        let similiarProductInfo = document.createElement('div');
                        similiarProductInfo.classList.add('similiar-product-info');
                        changeRightItems.appendChild(similiarProductInfo);

                        let similiarProductInfoBox = document.createElement('div');
                        similiarProductInfoBox.classList.add('similiar-product-info-box');
                        similiarProductInfo.appendChild(similiarProductInfoBox);

                        let similiarProductImage = document.createElement('img');
                        similiarProductImage.classList.add('similiar-product-image');
                        similiarProductInfoBox.appendChild(similiarProductImage);
                        similiarProductImage.src = item.picture;

                        similiarProductImage.addEventListener('click', function () {
                            changeRightItems.style.display = 'none';
                            drawRightProduct(item, containerEl, product);

                            for (let i = 0; i < blocks.length; i++) {
                                let block = blocks[i];
                                if (block.look_id == selectedProduct.getAttribute('data-look-id')) {
                                    for (let j = 0; j < block.products.length; j++) {
                                        let product = block.products[j];
                                        if (product.wareId == selectedProduct.getAttribute('data-id')) {
                                            item.collage_data = product.collage_data;
                                            item.wareId = product.wareId;
                                            blocks[i].products[j] = item;
                                        }
                                    }
                                }
                            }

                            let dotsBox = document.querySelector('div[data-id="' + selectedProduct.getAttribute('data-id') + '"] .right-box-dots');
                            dotsBox.innerHTML = '';
                            if (item.id == dotsBox.getAttribute('data-id')) {
                                item.pictures.forEach((dot, index) => {
                                    let dotElement = document.createElement('div');
                                    dotElement.classList.add('dot');
                                    dotsBox.appendChild(dotElement);

                                    dotElement.addEventListener('click', function () {
                                        let containerElement = this.closest('.right-boxes-image');
                                        let activeDot = this.parentElement.querySelector('.active');

                                        if (activeDot) {
                                            activeDot.classList.remove('active');
                                        }
                                        this.classList.add('active');

                                        changeProductImage(index, containerElement);
                                    });
                                });
                            }

                            function changeProductImage(index, containerElement) {

                                let imageBox = containerElement;
                                imageBox.setAttribute('data-id', productId);

                                productImage = imageBox.querySelector('.right-products-images');

                                if (productImage) {
                                    productImage.src = item.pictures[index];
                                }
                            }

                            let changeMainImage = document.querySelectorAll('div[data-look-id="' + selectedProduct.getAttribute('data-look-id') + '"] .items');
                            changeMainImage.forEach(a => {
                                if (a.getAttribute('data-id') == selectedProduct.getAttribute('data-id')) {
                                    a.src = this.src;
                                }
                            })

                            let changeCollageMainImage = document.querySelectorAll('div[data-look-id="' + selectedProduct.getAttribute('data-look-id') + '"] .picture');
                            changeCollageMainImage.forEach(b => {
                                if (b.getAttribute('data-id') == selectedProduct.getAttribute('data-id')) {
                                    b.src = this.src;
                                }
                            })
                        })

                        let similiarProductName = document.createElement('p');
                        similiarProductName.classList.add('similiar-product-name');
                        similiarProductInfoBox.appendChild(similiarProductName);
                        similiarProductName.innerHTML = item.name;

                        let similiarProductSize = document.createElement('div');
                        similiarProductSize.classList.add('similiar-product-size');
                        similiarProductInfo.appendChild(similiarProductSize);

                        let similiarProductSizeBox = document.createElement('div');
                        similiarProductSizeBox.classList.add('similiar-product-size-box');
                        similiarProductSize.appendChild(similiarProductSizeBox);

                        item.sizes.forEach((size) => {
                            let productSize = document.createElement('div');
                            productSize.classList.add('product-sizes');
                            similiarProductSizeBox.appendChild(productSize);
                            productSize.innerHTML = size.name;
                        })
                    }
                })
            }
        }
    }
    var data = JSON.stringify({ product_id: productId });
    xhr.send(data);
}
