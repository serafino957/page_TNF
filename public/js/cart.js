(function () {
    var CART_KEY = "tnf_cart";
    var CHECKOUT_DRAFT_KEY = "tnf_checkout_draft";
    var PRODUCTS = [
        { id: "jacket-apex", name: "Apex Insulated Jacket", category: "jackets", price: 199.0, rating: 5, image: "assets/category-jackets.svg", sizes: ["S", "M", "L", "XL"], colors: ["#1B1B1B", "#004E89"] },
        { id: "shell-wind", name: "Windproof Shell", category: "jackets", price: 149.0, rating: 4, image: "assets/category-jackets.svg", sizes: ["S", "M", "L"], colors: ["#334155", "#0F172A"] },
        { id: "backpack-alpine", name: "Alpine Trail Backpack", category: "backpacks", price: 129.0, rating: 5, image: "assets/category-backpacks.svg", sizes: ["One Size"], colors: ["#1B4965", "#FF6B35"] },
        { id: "duffel-base", name: "Basecamp Duffel", category: "backpacks", price: 139.0, rating: 4, image: "assets/category-backpacks.svg", sizes: ["One Size"], colors: ["#0369A1", "#16A34A"] },
        { id: "boots-ridge", name: "Ridge Hiker Boots", category: "footwear", price: 169.0, rating: 4, image: "assets/category-footwear.svg", sizes: ["8", "9", "10", "11"], colors: ["#4B5563", "#111827"] },
        { id: "gloves-summit", name: "Summit Thermal Gloves", category: "accessories", price: 49.0, rating: 4, image: "assets/category-accessories.svg", sizes: ["S", "M", "L"], colors: ["#111827", "#EF4444"] }
    ];
    var productsListState = {
        page: 1,
        pageSize: 4
    };

    function $(id) {
        return document.getElementById(id);
    }

    function readCart() {
        if (window.TNF_API) return window.TNF_API.readJson(CART_KEY, []);
        try {
            return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
        } catch (error) {
            return [];
        }
    }

    function writeCart(cart) {
        if (window.TNF_API) {
            window.TNF_API.writeJson(CART_KEY, cart);
        } else {
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
        }
        if (window.TNF && window.TNF.updateCartBadge) {
            window.TNF.updateCartBadge();
        }
    }

    function formatCurrency(value) {
        if (window.TNF_API) return window.TNF_API.formatCurrency(value);
        return "$" + Number(value || 0).toFixed(2);
    }

    function stars(rating) {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    }

    function notify(message) {
        var box = $("appNotice");
        if (!box) {
            box = document.createElement("div");
            box.id = "appNotice";
            box.setAttribute("role", "status");
            box.setAttribute("aria-live", "polite");
            box.style.position = "fixed";
            box.style.right = "20px";
            box.style.bottom = "20px";
            box.style.zIndex = "9999";
            box.style.background = "#1B1B1B";
            box.style.color = "#FFFFFF";
            box.style.padding = "10px 14px";
            box.style.borderRadius = "6px";
            box.style.boxShadow = "0 4px 14px rgba(0,0,0,0.2)";
            box.style.opacity = "0";
            box.style.transition = "opacity 0.2s ease";
            document.body.appendChild(box);
        }

        box.textContent = message;
        box.style.opacity = "1";
        window.clearTimeout(notify._timer);
        notify._timer = window.setTimeout(function () {
            box.style.opacity = "0";
        }, 1800);
    }

    function addProductToCart(product, quantity, size, color) {
        var qty = Math.max(1, Number(quantity || 1));
        var cart = readCart();
        var existing = cart.find(function (item) {
            return item.id === product.id && item.size === size && item.color === color;
        });

        if (existing) {
            existing.quantity += qty;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: qty,
                size: size,
                color: color,
                image: product.image
            });
        }

        writeCart(cart);
    }

    function buildProductCard(product) {
        return "" +
            '<article class="product-card">' +
            '<img class="product-image" src="' + product.image + '" alt="' + product.name + '">' +
            '<div class="product-info">' +
            '<h3 class="product-name">' + product.name + '</h3>' +
            '<div class="product-rating">' + stars(product.rating) + '</div>' +
            '<div class="product-price">' + formatCurrency(product.price) + '</div>' +
            '<button class="btn btn-primary" data-add-cart="' + product.id + '">Add to Cart</button>' +
            '</div>' +
            '</article>';
    }

    function bindAddToCartButtons() {
        document.querySelectorAll("[data-add-cart]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var id = btn.getAttribute("data-add-cart");
                var product = PRODUCTS.find(function (p) { return p.id === id; });
                if (!product) return;
                addProductToCart(product, 1, product.sizes[0], product.colors[0]);
                notify("Added to cart: " + product.name);
            });
        });
    }

    function renderFeaturedProducts() {
        var container = $("featuredProducts");
        if (!container) return;
        container.innerHTML = PRODUCTS.slice(0, 4).map(buildProductCard).join("");
        bindAddToCartButtons();
    }

    function renderProductsPage() {
        var grid = $("productsGrid");
        if (!grid) return;
        var pagination = $("pagination");

        var params = new URLSearchParams(window.location.search);
        var category = params.get("category") || "";
        var search = (params.get("search") || "").toLowerCase();
        var sortSelect = $("sortSelect");
        var categoryFilters = document.querySelectorAll(".category-filter");
        var sizeFilters = document.querySelectorAll(".size-filter");
        var ratingFilters = document.querySelectorAll("input[name='rating']");

        // Sync from URL only on first render to avoid overriding user filter changes.
        if (category && categoryFilters.length && !grid.dataset.categorySynced) {
            categoryFilters.forEach(function (checkbox) {
                checkbox.checked = checkbox.value === category;
            });
            grid.dataset.categorySynced = "1";
        }

        var selectedCategories = Array.prototype.slice.call(categoryFilters)
            .filter(function (checkbox) { return checkbox.checked; })
            .map(function (checkbox) { return checkbox.value; });

        var selectedSizes = Array.prototype.slice.call(sizeFilters)
            .filter(function (checkbox) { return checkbox.checked; })
            .map(function (checkbox) { return checkbox.value; });

        var selectedRatingNode = document.querySelector("input[name='rating']:checked");
        var selectedRating = selectedRatingNode ? Number(selectedRatingNode.value) : 0;

        var filtered = PRODUCTS.filter(function (product) {
            var categoryFromUrlOk = !category || product.category === category;
            var categoryFromFiltersOk = selectedCategories.length === 0 || selectedCategories.indexOf(product.category) !== -1;
            var searchOk = !search || product.name.toLowerCase().indexOf(search) !== -1;
            var sizeOk = selectedSizes.length === 0 || selectedSizes.some(function (size) {
                return product.sizes.indexOf(size) !== -1;
            });
            var ratingOk = !selectedRating || product.rating >= selectedRating;
            return categoryFromUrlOk && categoryFromFiltersOk && searchOk && sizeOk && ratingOk;
        });

        if (sortSelect) {
            if (sortSelect.value === "price-low") filtered.sort(function (a, b) { return a.price - b.price; });
            if (sortSelect.value === "price-high") filtered.sort(function (a, b) { return b.price - a.price; });
            if (sortSelect.value === "rating") filtered.sort(function (a, b) { return b.rating - a.rating; });
            if (!sortSelect.dataset.bound) {
                sortSelect.addEventListener("change", function () {
                    productsListState.page = 1;
                    renderProductsPage();
                });
                sortSelect.dataset.bound = "1";
            }
        }

        var minRange = $("priceMin");
        var maxRange = $("priceMax");
        if (minRange && maxRange) {
            var min = Number(minRange.value || 0);
            var max = Number(maxRange.value || 500);
            filtered = filtered.filter(function (p) { return p.price >= min && p.price <= max; });
            var minPrice = $("minPrice");
            var maxPrice = $("maxPrice");
            if (minPrice) minPrice.textContent = String(min);
            if (maxPrice) maxPrice.textContent = String(max);
            if (!minRange.dataset.bound) {
                minRange.addEventListener("input", function () {
                    productsListState.page = 1;
                    renderProductsPage();
                });
                minRange.dataset.bound = "1";
            }
            if (!maxRange.dataset.bound) {
                maxRange.addEventListener("input", function () {
                    productsListState.page = 1;
                    renderProductsPage();
                });
                maxRange.dataset.bound = "1";
            }
        }

        var totalPages = Math.max(1, Math.ceil(filtered.length / productsListState.pageSize));
        if (productsListState.page > totalPages) {
            productsListState.page = totalPages;
        }
        var start = (productsListState.page - 1) * productsListState.pageSize;
        var pageItems = filtered.slice(start, start + productsListState.pageSize);

        grid.innerHTML = pageItems.map(buildProductCard).join("");
        var count = $("resultsCount");
        if (count) count.textContent = String(filtered.length);

        if (pagination) {
            pagination.innerHTML = "";
            if (totalPages > 1) {
                for (var page = 1; page <= totalPages; page += 1) {
                    var button = document.createElement("button");
                    button.className = "btn " + (page === productsListState.page ? "btn-primary" : "btn-outline");
                    button.textContent = String(page);
                    button.style.marginRight = "8px";
                    button.style.padding = "8px 14px";
                    button.addEventListener("click", (function (targetPage) {
                        return function () {
                            productsListState.page = targetPage;
                            renderProductsPage();
                        };
                    })(page));
                    pagination.appendChild(button);
                }
            }
        }

        var clearFilters = $("clearFilters");
        if (clearFilters && !clearFilters.dataset.bound) {
            clearFilters.addEventListener("click", function () {
                if (minRange) minRange.value = "0";
                if (maxRange) maxRange.value = "500";
                if (sortSelect) sortSelect.value = "featured";
                productsListState.page = 1;
                categoryFilters.forEach(function (checkbox) { checkbox.checked = false; });
                sizeFilters.forEach(function (checkbox) { checkbox.checked = false; });
                ratingFilters.forEach(function (radio) { radio.checked = false; });
                var cleanUrl = "products.html";
                if (window.location.pathname.endsWith("products.html") || window.location.pathname.endsWith("/products.html")) {
                    window.history.replaceState({}, "", cleanUrl);
                    renderProductsPage();
                    return;
                }
                window.location.href = cleanUrl;
            });
            clearFilters.dataset.bound = "1";
        }

        categoryFilters.forEach(function (checkbox) {
            if (!checkbox.dataset.bound) {
                checkbox.addEventListener("change", function () {
                    productsListState.page = 1;
                    renderProductsPage();
                });
                checkbox.dataset.bound = "1";
            }
        });

        sizeFilters.forEach(function (checkbox) {
            if (!checkbox.dataset.bound) {
                checkbox.addEventListener("change", function () {
                    productsListState.page = 1;
                    renderProductsPage();
                });
                checkbox.dataset.bound = "1";
            }
        });

        ratingFilters.forEach(function (radio) {
            if (!radio.dataset.bound) {
                radio.addEventListener("change", function () {
                    productsListState.page = 1;
                    renderProductsPage();
                });
                radio.dataset.bound = "1";
            }
        });

        bindAddToCartButtons();
    }

    function renderProductDetail() {
        var title = $("productTitle");
        if (!title) return;

        var params = new URLSearchParams(window.location.search);
        var id = params.get("id") || PRODUCTS[0].id;
        var product = PRODUCTS.find(function (p) { return p.id === id; }) || PRODUCTS[0];

        title.textContent = product.name;
        if ($("breadcrumbProduct")) $("breadcrumbProduct").textContent = product.name;
        if ($("mainImage")) $("mainImage").src = product.image;
        if ($("productPrice")) $("productPrice").textContent = formatCurrency(product.price);
        if ($("productRating")) $("productRating").textContent = stars(product.rating);
        if ($("ratingCount")) $("ratingCount").textContent = "(127 reviews)";
        if ($("productDescription")) $("productDescription").textContent = "Built for changing mountain weather with durable protection and all-day comfort.";
        if ($("stockStatus")) $("stockStatus").innerHTML = '<span style="color:#28a745;font-weight:600;">In stock</span>';

        var sizeSelect = $("sizeSelect");
        if (sizeSelect) {
            sizeSelect.innerHTML = '<option value="">Select a size</option>';
            product.sizes.forEach(function (size) {
                var option = document.createElement("option");
                option.value = size;
                option.textContent = size;
                sizeSelect.appendChild(option);
            });
            sizeSelect.value = product.sizes[0];
        }

        var colorOptions = $("colorOptions");
        var selectedColor = product.colors[0];
        if (colorOptions) {
            colorOptions.innerHTML = "";
            product.colors.forEach(function (color, index) {
                var swatch = document.createElement("button");
                swatch.type = "button";
                swatch.className = "color-option" + (index === 0 ? " selected" : "");
                swatch.style.backgroundColor = color;
                swatch.dataset.color = color;
                swatch.setAttribute("aria-label", "Color option");
                swatch.addEventListener("click", function () {
                    colorOptions.querySelectorAll(".color-option").forEach(function (opt) { opt.classList.remove("selected"); });
                    swatch.classList.add("selected");
                    selectedColor = color;
                });
                colorOptions.appendChild(swatch);
            });
        }

        var qtyInput = $("quantityInput");
        if ($("increaseQty") && qtyInput) {
            $("increaseQty").addEventListener("click", function () {
                qtyInput.value = String(Math.min(10, Number(qtyInput.value || 1) + 1));
            });
        }
        if ($("decreaseQty") && qtyInput) {
            $("decreaseQty").addEventListener("click", function () {
                qtyInput.value = String(Math.max(1, Number(qtyInput.value || 1) - 1));
            });
        }

        if ($("addToCartBtn")) {
            $("addToCartBtn").addEventListener("click", function () {
                var qty = Math.max(1, Number(qtyInput ? qtyInput.value : 1));
                var size = sizeSelect ? sizeSelect.value : product.sizes[0];
                addProductToCart(product, qty, size, selectedColor);
                notify("Added to cart.");
            });
        }

        document.querySelectorAll(".tab-btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var tab = btn.getAttribute("data-tab");
                document.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
                document.querySelectorAll(".tab-content").forEach(function (pane) { pane.classList.remove("active"); });
                btn.classList.add("active");
                if ($(tab)) $(tab).classList.add("active");
            });
        });
    }

    function totals(cart, shipping) {
        var subtotal = cart.reduce(function (sum, item) { return sum + item.price * item.quantity; }, 0);
        var shippingCost = typeof shipping === "number" ? shipping : (subtotal >= 100 ? 0 : 10);
        var tax = subtotal * 0.08;
        return { subtotal: subtotal, shipping: shippingCost, tax: tax, total: subtotal + shippingCost + tax };
    }

    function renderCartPage() {
        var tableBody = $("cartTableBody");
        var empty = $("emptyCart");
        var withItems = $("cartWithItems");
        if (!tableBody || !empty || !withItems) return;

        var cart = readCart();
        if (cart.length === 0) {
            empty.style.display = "block";
            withItems.style.display = "none";
            return;
        }

        empty.style.display = "none";
        withItems.style.display = "grid";

        tableBody.innerHTML = cart.map(function (item, index) {
            return "" +
                "<tr>" +
                "<td><div class=\"cart-product\"><img class=\"cart-product-image\" src=\"" + item.image + "\" alt=\"" + item.name + "\"><div class=\"cart-product-info\"><h3>" + item.name + "</h3><p>Size: " + item.size + "</p></div></div></td>" +
                "<td>" + formatCurrency(item.price) + "</td>" +
                "<td><input data-cart-qty=\"" + index + "\" type=\"number\" min=\"1\" value=\"" + item.quantity + "\" style=\"width:65px;\"></td>" +
                "<td>" + formatCurrency(item.price * item.quantity) + "</td>" +
                "<td><button class=\"btn btn-danger\" data-cart-remove=\"" + index + "\">Remove</button></td>" +
                "</tr>";
        }).join("");

        var summary = totals(cart);
        if ($("subtotal")) $("subtotal").textContent = formatCurrency(summary.subtotal);
        if ($("shippingCost")) $("shippingCost").textContent = formatCurrency(summary.shipping);
        if ($("tax")) $("tax").textContent = formatCurrency(summary.tax);
        if ($("total")) $("total").textContent = formatCurrency(summary.total);

        document.querySelectorAll("[data-cart-remove]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var idx = Number(btn.getAttribute("data-cart-remove"));
                writeCart(readCart().filter(function (_item, i) { return i !== idx; }));
                renderCartPage();
            });
        });

        document.querySelectorAll("[data-cart-qty]").forEach(function (input) {
            input.addEventListener("change", function () {
                var idx = Number(input.getAttribute("data-cart-qty"));
                var next = Math.max(1, Number(input.value || 1));
                var nextCart = readCart();
                if (nextCart[idx]) {
                    nextCart[idx].quantity = next;
                    writeCart(nextCart);
                    renderCartPage();
                }
            });
        });

        if ($("applyPromo") && !$("applyPromo").dataset.bound) {
            $("applyPromo").addEventListener("click", function () {
                var code = ($("promoCode") ? $("promoCode").value : "").trim().toUpperCase();
                var discountItem = $("discountItem");
                var discountAmount = $("discountAmount");
                if (code === "TNF10") {
                    var discount = summary.subtotal * 0.1;
                    if (discountItem) discountItem.style.display = "flex";
                    if (discountAmount) discountAmount.textContent = "-" + formatCurrency(discount);
                    if ($("total")) $("total").textContent = formatCurrency(summary.total - discount);
                    notify("Promo code applied.");
                } else {
                    if (discountItem) discountItem.style.display = "none";
                    notify("Invalid promo code. Try TNF10");
                }
            });
            $("applyPromo").dataset.bound = "1";
        }

        if ($("checkoutBtn") && !$("checkoutBtn").dataset.bound) {
            $("checkoutBtn").addEventListener("click", function () {
                window.location.href = "checkout.html";
            });
            $("checkoutBtn").dataset.bound = "1";
        }
    }

    function renderCheckoutPage() {
        var form = $("checkoutForm");
        if (!form) return;

        var cart = readCart();
        if (cart.length === 0) {
            window.location.href = "cart.html";
            return;
        }

        var shippingPrice = 10;
        var checkoutFields = [
            "firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode", "country",
            "cardName", "cardNumber", "expiry", "cvv"
        ];

        function readDraft() {
            if (window.TNF_API) return window.TNF_API.readJson(CHECKOUT_DRAFT_KEY, {});
            try {
                return JSON.parse(localStorage.getItem(CHECKOUT_DRAFT_KEY) || "{}");
            } catch (error) {
                return {};
            }
        }

        function writeDraft(data) {
            if (window.TNF_API) {
                window.TNF_API.writeJson(CHECKOUT_DRAFT_KEY, data);
            } else {
                localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(data));
            }
        }

        function clearDraft() {
            localStorage.removeItem(CHECKOUT_DRAFT_KEY);
        }

        function markInvalid(node) {
            if (!node) return;
            node.style.borderColor = "#dc3545";
            node.style.boxShadow = "0 0 0 3px rgba(220, 53, 69, 0.15)";
        }

        function clearInvalid(node) {
            if (!node) return;
            node.style.borderColor = "";
            node.style.boxShadow = "";
        }

        function persistDraft() {
            var draft = {};
            checkoutFields.forEach(function (id) {
                if ($(id)) draft[id] = $(id).value;
            });
            writeDraft(draft);
        }

        function hydrateDraft() {
            var draft = readDraft();
            checkoutFields.forEach(function (id) {
                if ($(id) && typeof draft[id] === "string" && draft[id]) {
                    $(id).value = draft[id];
                }
            });
        }

        function bindDraftInputs() {
            checkoutFields.forEach(function (id) {
                if (!$(id) || $(id).dataset.draftBound) return;
                $(id).addEventListener("input", function () {
                    clearInvalid($(id));
                    persistDraft();
                });
                $(id).dataset.draftBound = "1";
            });
        }

        function bindMasks() {
            var cardInput = $("cardNumber");
            if (cardInput && !cardInput.dataset.maskBound) {
                cardInput.addEventListener("input", function () {
                    var digits = cardInput.value.replace(/\D/g, "").slice(0, 19);
                    cardInput.value = digits.replace(/(.{4})/g, "$1 ").trim();
                });
                cardInput.dataset.maskBound = "1";
            }

            var expiryInput = $("expiry");
            if (expiryInput && !expiryInput.dataset.maskBound) {
                expiryInput.addEventListener("input", function () {
                    var digits = expiryInput.value.replace(/\D/g, "").slice(0, 4);
                    if (digits.length >= 3) {
                        expiryInput.value = digits.slice(0, 2) + "/" + digits.slice(2);
                    } else {
                        expiryInput.value = digits;
                    }
                });
                expiryInput.dataset.maskBound = "1";
            }

            var cvvInput = $("cvv");
            if (cvvInput && !cvvInput.dataset.maskBound) {
                cvvInput.addEventListener("input", function () {
                    cvvInput.value = cvvInput.value.replace(/\D/g, "").slice(0, 4);
                });
                cvvInput.dataset.maskBound = "1";
            }
        }

        function setStep(step) {
            ["shippingStep", "paymentStep", "reviewStep"].forEach(function (id, index) {
                if ($(id)) $(id).classList.toggle("active", index + 1 === step);
            });
            document.querySelectorAll(".checkout-steps .step").forEach(function (node) {
                node.classList.toggle("active", Number(node.getAttribute("data-step")) === step);
            });
        }

        function renderSummary() {
            var summary = totals(cart, shippingPrice);
            if ($("summarySubtotal")) $("summarySubtotal").textContent = formatCurrency(summary.subtotal);
            if ($("summaryShipping")) $("summaryShipping").textContent = formatCurrency(summary.shipping);
            if ($("summaryTax")) $("summaryTax").textContent = formatCurrency(summary.tax);
            if ($("summaryTotal")) $("summaryTotal").textContent = formatCurrency(summary.total);
            if ($("orderSummaryItems")) {
                $("orderSummaryItems").innerHTML = cart.map(function (item) {
                    return "<p style=\"margin-bottom: 8px;\">" + item.name + " x" + item.quantity + "</p>";
                }).join("");
            }
        }

        function fieldValue(id) {
            return $(id) ? $(id).value.trim() : "";
        }

        function validateShippingStep() {
            var requiredIds = ["firstName", "lastName", "email", "phone", "address", "city", "state", "zipCode", "country"];
            for (var i = 0; i < requiredIds.length; i += 1) {
                var id = requiredIds[i];
                var node = $(id);
                if (!node || !fieldValue(id)) {
                    notify("Please complete all shipping fields.");
                    markInvalid(node);
                    if (node) node.focus();
                    return false;
                }
                clearInvalid(node);
            }

            var email = fieldValue("email");
            if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
                notify("Please enter a valid email.");
                markInvalid($("email"));
                if ($("email")) $("email").focus();
                return false;
            }
            clearInvalid($("email"));

            return true;
        }

        function validatePaymentStep() {
            if (!fieldValue("cardName")) {
                notify("Cardholder name is required.");
                markInvalid($("cardName"));
                if ($("cardName")) $("cardName").focus();
                return false;
            }
            clearInvalid($("cardName"));

            var card = fieldValue("cardNumber").replace(/\s+/g, "");
            if (!/^\d{13,19}$/.test(card)) {
                notify("Please enter a valid card number.");
                markInvalid($("cardNumber"));
                if ($("cardNumber")) $("cardNumber").focus();
                return false;
            }
            clearInvalid($("cardNumber"));

            var expiry = fieldValue("expiry");
            if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry)) {
                notify("Expiry must be in MM/YY format.");
                markInvalid($("expiry"));
                if ($("expiry")) $("expiry").focus();
                return false;
            }
            clearInvalid($("expiry"));

            var cvv = fieldValue("cvv");
            if (!/^\d{3,4}$/.test(cvv)) {
                notify("Please enter a valid CVV.");
                markInvalid($("cvv"));
                if ($("cvv")) $("cvv").focus();
                return false;
            }
            clearInvalid($("cvv"));

            return true;
        }

        document.querySelectorAll("input[name='shippingMethod']").forEach(function (radio) {
            radio.addEventListener("change", function () {
                shippingPrice = radio.value === "express" ? 25 : (radio.value === "overnight" ? 50 : 10);
                renderSummary();
            });
        });

        if ($("nextPaymentBtn")) {
            $("nextPaymentBtn").addEventListener("click", function () {
                if (!validateShippingStep()) return;
                setStep(2);
            });
        }
        if ($("backShippingBtn")) $("backShippingBtn").addEventListener("click", function () { setStep(1); });

        if ($("nextReviewBtn")) {
            $("nextReviewBtn").addEventListener("click", function () {
                if (!validatePaymentStep()) return;
                if ($("reviewShipping")) {
                    $("reviewShipping").innerHTML =
                        "<p>" + ($("firstName") ? $("firstName").value : "") + " " + ($("lastName") ? $("lastName").value : "") + "</p>" +
                        "<p>" + ($("address") ? $("address").value : "") + ", " + ($("city") ? $("city").value : "") + "</p>";
                }
                if ($("reviewPayment")) {
                    var card = $("cardNumber") ? $("cardNumber").value : "";
                    $("reviewPayment").textContent = "Card ending in " + String(card || "0000").slice(-4);
                }
                if ($("reviewItems")) {
                    $("reviewItems").innerHTML = cart.map(function (item) {
                        return "<tr><td>" + item.name + "</td><td>" + item.quantity + "</td><td>" + formatCurrency(item.price) + "</td><td>" + formatCurrency(item.price * item.quantity) + "</td></tr>";
                    }).join("");
                }
                setStep(3);
            });
        }

        if ($("backPaymentBtn")) $("backPaymentBtn").addEventListener("click", function () { setStep(2); });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            writeCart([]);
            clearDraft();
            notify("Order placed successfully.");
            window.location.href = "index.html";
        });

        hydrateDraft();
        bindMasks();
        bindDraftInputs();
        renderSummary();
    }

    function renderAccountPage() {
        var user = $("accountUser");
        if (!user) return;

        user.innerHTML = '<h3 style="margin-bottom:8px;">Explorer Member</h3><p style="color:#999;">member@thenorthface.local</p>';

        var sections = {
            dashboard: $("dashboardSection"),
            orders: $("ordersSection"),
            addresses: $("addressesSection"),
            wishlist: $("wishlistSection"),
            profile: $("profileSection"),
            settings: $("settingsSection")
        };

        document.querySelectorAll(".account-nav-link[data-section]").forEach(function (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault();
                var key = link.getAttribute("data-section");
                document.querySelectorAll(".account-nav-link").forEach(function (node) { node.classList.remove("active"); });
                link.classList.add("active");
                Object.keys(sections).forEach(function (name) {
                    if (sections[name]) sections[name].classList.toggle("active", name === key);
                });
            });
        });

        if ($("totalOrders")) $("totalOrders").textContent = "12";
        if ($("wishlistCount")) $("wishlistCount").textContent = "5";
        if ($("totalSpent")) $("totalSpent").textContent = "$2,640.00";
        if ($("rewardPoints")) $("rewardPoints").textContent = "840";

        if ($("recentOrdersList")) {
            $("recentOrdersList").innerHTML = "<p style=\"margin-bottom:8px;\">#TNF-1024 - Delivered</p><p style=\"margin-bottom:8px;\">#TNF-1023 - Processing</p>";
        }
        if ($("ordersList")) $("ordersList").innerHTML = "<p>Use the filter to browse your order history.</p>";
        if ($("addressesList")) $("addressesList").innerHTML = "<p>123 Mountain View Rd, Denver, CO 80202, US</p>";

        if ($("wishlistGrid")) {
            $("wishlistGrid").innerHTML = PRODUCTS.slice(0, 3).map(buildProductCard).join("");
            bindAddToCartButtons();
        }

        if ($("addAddressBtn") && $("addressForm")) {
            $("addAddressBtn").addEventListener("click", function () { $("addressForm").style.display = "block"; });
        }
        if ($("cancelAddressBtn") && $("addressForm")) {
            $("cancelAddressBtn").addEventListener("click", function () { $("addressForm").style.display = "none"; });
        }
        if ($("profileForm")) {
            $("profileForm").addEventListener("submit", function (event) {
                event.preventDefault();
                notify("Profile updated.");
            });
        }
        if ($("logoutLink")) {
            $("logoutLink").addEventListener("click", function (event) {
                event.preventDefault();
                notify("Logged out.");
                window.location.href = "index.html";
            });
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        renderFeaturedProducts();
        renderProductsPage();
        renderProductDetail();
        renderCartPage();
        renderCheckoutPage();
        renderAccountPage();
    });
})();
