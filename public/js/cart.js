(function () {
    var CART_KEY = "tnf_cart";
    var WISHLIST_KEY = "tnf_wishlist";
    var CHECKOUT_DRAFT_KEY = "tnf_checkout_draft";
    var PRODUCTS = [
        { id: "jacket-apex", name: "Apex Insulated Jacket", description: "A warm insulated jacket for cold trail days, with lightweight protection against wind and light rain.", category: "jackets", price: 199.0, originalPrice: 249.0, rating: 5, sale: true, image: "assets/apex-insulated-jacket.jpg", images: ["assets/apex-insulated-jacket.jpg", "assets/apex-insulated-jacket-alt1.jpg", "assets/apex-insulated-jacket-alt2.jpg"], sizes: ["S", "M", "L", "XL"], colors: [{ code: "#111111", name: "Black" }, { code: "#D9D0BF", name: "Sand" }], features: ["Water-resistant shell", "Synthetic insulation", "Adjustable hood", "Three zip pockets"] },
        { id: "shell-wind", name: "Windproof Shell", description: "A lightweight shell built to block strong wind while keeping you comfortable during fast-moving adventures.", category: "jackets", price: 149.0, rating: 4, image: "assets/windproof-shell.jpg", images: ["assets/windproof-shell.jpg", "assets/windproof-shell-alt1.jpg", "assets/windproof-shell-alt2.jpg"], sizes: ["S", "M", "L"], colors: [{ code: "#D7D0BF", name: "Sand" }, { code: "#111111", name: "Black" }], features: ["Windproof construction", "Breathable fabric", "Sealed seams", "Packable design"] },
        { id: "backpack-alpine", name: "Alpine Trail Backpack", description: "A versatile 28-liter daypack with organized storage for mountain hikes, commutes, and weekend exploration.", category: "backpacks", price: 129.0, originalPrice: 159.0, rating: 5, sale: true, image: "assets/alpine-trail-backpack.jpg", images: ["assets/alpine-trail-backpack.jpg", "assets/alpine-trail-backpack-alt1.jpg", "assets/alpine-trail-backpack-alt2.jpg"], sizes: ["One Size"], colors: [{ code: "#F1C74C", name: "Golden Yellow" }, { code: "#111111", name: "Black" }], features: ["28L capacity", "Padded laptop sleeve", "Hydration compatible", "Adjustable shoulder straps"] },
        { id: "duffel-base", name: "Basecamp Duffel", description: "A rugged, spacious duffel designed to carry everything you need for basecamp, travel, or the gym.", category: "backpacks", price: 139.0, rating: 4, image: "assets/basecamp-duffel.jpg", images: ["assets/basecamp-duffel.jpg", "assets/basecamp-duffel-alt1.jpg", "assets/basecamp-duffel-alt2.jpg"], sizes: ["One Size"], colors: [{ code: "#F5F4F1", name: "Off White" }, { code: "#C1272D", name: "Red" }], features: ["Durable recycled fabric", "71L capacity", "Removable shoulder strap", "Separate shoe compartment"] },
        { id: "boots-ridge", name: "Ridge Hiker Boots", description: "Supportive waterproof hiking boots with dependable traction for rocky trails and changing mountain weather.", category: "footwear", price: 169.0, originalPrice: 219.0, rating: 4, sale: true, images: ["assets/category-footwear.jpg", "assets/category-footwear-alt1.jpg", "assets/category-footwear-alt3.jpg"], image: "assets/category-footwear.jpg", sizes: ["8", "9", "10", "11"], colors: [{ code: "#111111", name: "Black" }, { code: "#7B7B7B", name: "Graphite" }], features: ["Waterproof leather upper", "Vibram traction outsole", "EVA cushioning", "Protective toe cap"] },
        { id: "gloves-summit", name: "Summit Thermal Gloves", description: "Warm, dexterous gloves that protect your hands from the cold while keeping touchscreen control close at hand.", category: "accessories", price: 49.0, rating: 4, image: "assets/category-accessories.jpg", images: ["assets/category-accessories.jpg", "assets/category-accessories-alt1.jpg", "assets/category-accessories-alt2.jpg"], sizes: ["S", "M", "L"], colors: [{ code: "#111111", name: "Black" }, { code: "#8B6A4E", name: "Taupe" }], features: ["Thermal fleece lining", "Touchscreen compatible", "Grippy palm", "Elastic wrist cuff"] },
        { id: "tent-summit", name: "Summit Trail Tent", description: "A lightweight two-person tent designed for reliable shelter on overnight hikes and weekend adventures.", category: "tents", price: 249.0, rating: 5, image: "assets/summit-trail-tent.jpg", images: ["assets/summit-trail-tent.jpg", "assets/summit-trail-tent-alt1.jpg", "assets/summit-trail-tent-alt2.jpg"], sizes: ["2 Person"], colors: [{ code: "#1A2B3D", name: "Deep Navy" }, { code: "#A6B1B7", name: "Stone Grey" }], features: ["Two-person capacity", "Waterproof rainfly", "Aluminum poles", "Compact carry bag"] },
        { id: "sleeping-bag-basecamp", name: "Basecamp Sleeping Bag", description: "A warm, packable sleeping bag built for comfortable nights at camp in cool conditions.", category: "sleeping-bags", price: 129.0, originalPrice: 169.0, rating: 4, sale: true, image: "assets/basecamp-sleeping-bag.jpg", images: ["assets/basecamp-sleeping-bag.jpg", "assets/basecamp-sleeping-bag-int.jpg", "assets/basecamp-sleeping-bag-alt1.jpg"], sizes: ["Regular"], colors: [{ code: "#1B2A3B", name: "Midnight Blue" }, { code: "#7A8C9A", name: "Mist Grey" }], features: ["Synthetic insulation", "Comfortable hood", "Full-length zipper", "Packable stuff sack"] }
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

    function readWishlist() {
        var wishlist = null;
        try {
            wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "null");
        } catch (error) {
            wishlist = null;
        }
        if (!Array.isArray(wishlist)) {
            try {
                wishlist = JSON.parse(sessionStorage.getItem(WISHLIST_KEY) || "[]");
            } catch (error) {
                wishlist = [];
            }
        }
        if (!Array.isArray(wishlist) || wishlist.length === 0) {
            try {
                var cookieValue = document.cookie.split("; ").find(function (entry) {
                    return entry.indexOf(WISHLIST_KEY + "=") === 0;
                });
                if (cookieValue) wishlist = JSON.parse(decodeURIComponent(cookieValue.split("=").slice(1).join("=")));
            } catch (error) {
                wishlist = Array.isArray(wishlist) ? wishlist : [];
            }
        }

        if (!Array.isArray(wishlist)) return [];
        return wishlist.map(function (item) {
            if (typeof item === "string") return item;
            if (!item) return null;
            return item.id || item.productId || (item.product && item.product.id);
        }).filter(Boolean);
    }

    function writeWishlist(wishlist) {
        var serialized = JSON.stringify(wishlist);
        try {
            localStorage.setItem(WISHLIST_KEY, serialized);
        } catch (error) {
            try {
                sessionStorage.setItem(WISHLIST_KEY, serialized);
            } catch (storageError) {
                notify("Wishlist storage is unavailable in this browser.");
                return;
            }
        }
        try {
            document.cookie = WISHLIST_KEY + "=" + encodeURIComponent(serialized) + "; path=/; max-age=31536000; SameSite=Lax";
        } catch (error) { }
        window.dispatchEvent(new CustomEvent("tnf:wishlist-updated"));
    }

    function readWishlistFromUrl() {
        var params = new URLSearchParams(window.location.search);
        return (params.get("items") || "").split(",").filter(Boolean);
    }

    function bindWishlistNavigation() {
        document.querySelectorAll('a[href$="wishlist.html"]').forEach(function (link) {
            if (link.dataset.wishlistNavigationBound === "1") return;
            link.dataset.wishlistNavigationBound = "1";
            link.addEventListener("click", function () {
                var items = readWishlist();
                if (items.length) {
                    link.href = "wishlist.html?items=" + encodeURIComponent(items.join(","));
                }
            });
        });
    }

    function readAccounts() {
        try {
            return JSON.parse(localStorage.getItem("tnf_accounts") || "[]");
        } catch (error) {
            return [];
        }
    }

    function writeAccounts(accounts) {
        localStorage.setItem("tnf_accounts", JSON.stringify(accounts));
    }

    function getCurrentUser() {
        try {
            return JSON.parse(localStorage.getItem("tnf_current_user") || "null");
        } catch (error) {
            return null;
        }
    }

    function setCurrentUser(user) {
        localStorage.setItem("tnf_current_user", JSON.stringify(user));
    }

    function clearCurrentUser() {
        localStorage.removeItem("tnf_current_user");
    }

    function getUserAccountByEmail(email) {
        var normalized = String(email || "").trim().toLowerCase();
        return readAccounts().find(function (account) {
            return String(account.email || "").trim().toLowerCase() === normalized;
        }) || null;
    }

    function saveCurrentUserProfile(updates) {
        var currentUser = getCurrentUser();
        if (!currentUser) return null;

        var accounts = readAccounts();
        var index = accounts.findIndex(function (account) {
            return account.id === currentUser.id;
        });

        if (index === -1) return null;

        var nextUser = Object.assign({}, accounts[index], updates, {
            id: currentUser.id,
            email: String((updates.email || accounts[index].email || "")).trim().toLowerCase(),
            firstName: String((updates.firstName || accounts[index].firstName || "")).trim(),
            lastName: String((updates.lastName || accounts[index].lastName || "")).trim(),
            phone: String((updates.phone || accounts[index].phone || "")).trim(),
            dob: updates.dob || accounts[index].dob || "",
            gender: updates.gender || accounts[index].gender || "",
            settings: Object.assign({}, accounts[index].settings || {}, updates.settings || {})
        });

        accounts[index] = nextUser;
        writeAccounts(accounts);
        setCurrentUser(nextUser);
        return nextUser;
    }

    function formatCurrency(value) {
        if (window.TNF_API) return window.TNF_API.formatCurrency(value);
        return "$" + Number(value || 0).toFixed(2);
    }

    function stars(rating) {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    }

    function localizedProductName(name) {
        var language = document.body.dataset.language || "en";
        return window.TNF && window.TNF.translateValue ? window.TNF.translateValue(name, language) : name;
    }

    function localizedText(text) {
        return localizedProductName(text);
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
        var productName = localizedProductName(product.name);
        var saleMarkup = product.sale && product.originalPrice ?
            '<div class="product-price-row"><span class="product-price sale-price">' + formatCurrency(product.price) + '</span><span class="product-original-price">' + formatCurrency(product.originalPrice) + '</span></div>' :
            '<div class="product-price">' + formatCurrency(product.price) + '</div>';

        return "" +
            '<article class="product-card" data-product-id="' + product.id + '" tabindex="0" role="link" aria-label="View ' + productName + '">' +
            '<img class="product-image" src="' + product.image + '" alt="' + productName + '">' +
            '<button class="wishlist-card-btn" data-wishlist="' + product.id + '" type="button" aria-label="Add ' + productName + ' to wishlist"><i class="far fa-heart"></i></button>' +
            '<div class="product-info">' +
            '<h3 class="product-name">' + productName + '</h3>' +
            '<div class="product-rating">' + stars(product.rating) + '</div>' +
            (product.sale ? '<span class="sale-badge">Sale</span>' : '') +
            saleMarkup +
            '<button class="btn btn-primary" data-add-cart="' + product.id + '">Add to Cart</button>' +
            '</div>' +
            '</article>';
    }

    function bindProductCards() {
        document.querySelectorAll(".product-card[data-product-id]").forEach(function (card) {
            function openProduct() {
                window.location.href = "product-detail.html?id=" + encodeURIComponent(card.getAttribute("data-product-id"));
            }

            card.addEventListener("click", function (event) {
                if (event.target.closest("[data-add-cart], [data-wishlist]")) return;
                openProduct();
            });
            card.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openProduct();
                }
            });
        });
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
        document.querySelectorAll("[data-wishlist]").forEach(function (btn) {
            if (btn.dataset.bound) return;
            btn.dataset.bound = "1";
            var productId = btn.getAttribute("data-wishlist");
            var product = PRODUCTS.find(function (item) { return item.id === productId; });
            if (!product) return;

            function updateButton() {
                var saved = readWishlist().indexOf(productId) !== -1;
                btn.innerHTML = saved ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
                btn.classList.toggle("is-saved", saved);
                btn.setAttribute("aria-label", saved ? "Remove " + localizedProductName(product.name) + " from wishlist" : "Add " + localizedProductName(product.name) + " to wishlist");
            }

            updateButton();
            btn.addEventListener("click", function (event) {
                event.preventDefault();
                event.stopPropagation();
                var wishlist = readWishlist();
                var index = wishlist.indexOf(productId);
                if (index === -1) {
                    wishlist.push(productId);
                    notify("Added to wishlist.");
                } else {
                    wishlist.splice(index, 1);
                    notify("Removed from wishlist.");
                }
                writeWishlist(wishlist);
                updateButton();
                if ($("wishlistPageGrid")) renderWishlistPage();
                if ($("wishlistGrid")) renderAccountWishlist();
            });
        });
        bindProductCards();
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
        var saleOnly = params.get("sale") === "true" || params.get("sale") === "1";
        var sortSelect = $("sortSelect");
        var categoryFilters = document.querySelectorAll(".category-filter");
        var sizeFilters = document.querySelectorAll(".size-filter");
        var ratingFilters = document.querySelectorAll("input[name='rating']");
        var savedFilterState = null;

        if (search) {
            try {
                savedFilterState = JSON.parse(sessionStorage.getItem("tnf_filter_state") || "null");
                sessionStorage.removeItem("tnf_filter_state");
            } catch (error) {
                savedFilterState = null;
            }
        }

        if (savedFilterState) {
            categoryFilters.forEach(function (checkbox) { checkbox.checked = savedFilterState.categories.indexOf(checkbox.value) !== -1; });
            sizeFilters.forEach(function (checkbox) { checkbox.checked = savedFilterState.sizes.indexOf(checkbox.value) !== -1; });
            ratingFilters.forEach(function (radio) { radio.checked = radio.value === savedFilterState.rating; });
            if ($("priceMin")) $("priceMin").value = savedFilterState.minPrice;
            if ($("priceMax")) $("priceMax").value = savedFilterState.maxPrice;
            if ($("sortSelect")) $("sortSelect").value = savedFilterState.sort;
        }

        // Sync from URL only on first render to avoid overriding user filter changes.
        if (category && categoryFilters.length && !savedFilterState && !grid.dataset.categorySynced) {
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
            var searchValues = [product.name, product.description, product.category];
            if (window.TNF && window.TNF.translateValue) {
                searchValues.push(window.TNF.translateValue(product.name, "uk"));
                searchValues.push(window.TNF.translateValue(product.description, "uk"));
                searchValues.push(window.TNF.translateValue(product.category, "uk"));
            }
            var searchOk = !search || searchValues.join(" ").toLowerCase().indexOf(search) !== -1;
            var sizeOk = selectedSizes.length === 0 || selectedSizes.some(function (size) {
                return product.sizes.indexOf(size) !== -1;
            });
            var ratingOk = !selectedRating || product.rating >= selectedRating;
            var saleOk = !saleOnly || Boolean(product.sale);
            return categoryFromUrlOk && categoryFromFiltersOk && searchOk && sizeOk && ratingOk && saleOk;
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
                    var currentParams = new URLSearchParams(window.location.search);
                    if (currentParams.has("category") || currentParams.has("search")) {
                        currentParams.delete("category");
                        currentParams.delete("search");
                        window.history.replaceState({}, "", "products.html?" + currentParams.toString());
                    }
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

        title.textContent = localizedProductName(product.name);
        if ($("breadcrumbProduct")) $("breadcrumbProduct").textContent = localizedProductName(product.name);
        if ($("mainImage")) $("mainImage").src = product.image;
        var thumbnailImages = $("thumbnailImages");
        if (thumbnailImages) {
            thumbnailImages.innerHTML = (product.images || [product.image]).map(function (image, index) {
                return '<img src="' + image + '" alt="' + localizedProductName(product.name) + ' ' + (index + 1) + '" class="' + (index === 0 ? "active" : "") + '">';
            }).join("");
            thumbnailImages.querySelectorAll("img").forEach(function (thumbnail) {
                thumbnail.addEventListener("click", function () {
                    $("mainImage").src = thumbnail.src;
                    thumbnailImages.querySelectorAll("img").forEach(function (item) { item.classList.remove("active"); });
                    thumbnail.classList.add("active");
                });
            });
        }
        var mainImage = $("mainImage");
        if (mainImage && !mainImage.dataset.zoomBound) {
            mainImage.addEventListener("click", function (event) {
                if (!mainImage.classList.contains("zoomed")) {
                    var imageBounds = mainImage.getBoundingClientRect();
                    var originX = ((event.clientX - imageBounds.left) / imageBounds.width) * 100;
                    var originY = ((event.clientY - imageBounds.top) / imageBounds.height) * 100;
                    mainImage.style.transformOrigin = originX + "% " + originY + "%";
                }
                mainImage.classList.toggle("zoomed");
            });
            mainImage.dataset.zoomBound = "1";
        }
        if ($("productPrice")) $("productPrice").textContent = formatCurrency(product.price);
        if ($("productRating")) $("productRating").textContent = stars(product.rating);
        if ($("ratingCount")) $("ratingCount").textContent = "(127 reviews)";
        if ($("descriptionContent")) $("descriptionContent").textContent = localizedText(product.description);
        if ($("stockStatus")) $("stockStatus").innerHTML = '<span style="color:#28a745;font-weight:600;">In stock</span>';
        if ($("specificationsTable")) {
            $("specificationsTable").innerHTML = "<tr><th>" + localizedText("Feature") + "</th><th>" + localizedText("Details") + "</th></tr>" + product.features.map(function (feature, index) {
                return "<tr><td>" + localizedText("Feature " + (index + 1)) + "</td><td>" + localizedText(feature) + "</td></tr>";
            }).join("") + "<tr><td>" + localizedText("Available sizes") + "</td><td>" + product.sizes.join(", ") + "</td></tr>";
        }

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
        var normalizedColors = (product.colors || []).map(function (color) {
            if (typeof color === "string") {
                return { code: color, name: "Color" };
            }
            return color;
        });
        var selectedColor = normalizedColors[0] ? normalizedColors[0].code : "";
        if (colorOptions) {
            colorOptions.innerHTML = "";
            normalizedColors.forEach(function (colorItem, index) {
                var swatch = document.createElement("button");
                swatch.type = "button";
                swatch.className = "color-option" + (index === 0 ? " selected" : "");
                swatch.style.backgroundColor = colorItem.code;
                swatch.dataset.color = colorItem.code;
                swatch.title = colorItem.name || "Color option";
                swatch.setAttribute("aria-label", "Color option: " + (colorItem.name || "Color"));
                swatch.addEventListener("click", function () {
                    colorOptions.querySelectorAll(".color-option").forEach(function (opt) { opt.classList.remove("selected"); });
                    swatch.classList.add("selected");
                    selectedColor = colorItem.code;
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

        var wishlistButton = $("wishlistBtn");
        if (wishlistButton) {
            var wishlist = readWishlist();
            var isSaved = wishlist.indexOf(product.id) !== -1;
            wishlistButton.innerHTML = isSaved ? '<i class="fas fa-heart"></i> Remove from Wishlist' : '<i class="far fa-heart"></i> Add to Wishlist';
            wishlistButton.addEventListener("click", function () {
                var currentWishlist = readWishlist();
                var productIndex = currentWishlist.indexOf(product.id);
                if (productIndex === -1) {
                    currentWishlist.push(product.id);
                    wishlistButton.innerHTML = '<i class="fas fa-heart"></i> Remove from Wishlist';
                    notify("Added to wishlist.");
                } else {
                    currentWishlist.splice(productIndex, 1);
                    wishlistButton.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
                    notify("Removed from wishlist.");
                }
                writeWishlist(currentWishlist);
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
        var authShell = $("authShell");
        var accountContent = document.querySelector(".account-content");
        var user = $("accountUser");
        var currentUser = getCurrentUser();

        if (!currentUser) {
            if (authShell) authShell.style.display = "block";
            if (accountContent) accountContent.style.display = "none";

            var loginForm = $("loginForm");
            var registerForm = $("registerForm");
            var authTabs = document.querySelectorAll(".auth-tab");

            if (authTabs.length) {
                authTabs.forEach(function (tab) {
                    if (tab.dataset.authBound === "1") return;
                    tab.dataset.authBound = "1";
                    tab.addEventListener("click", function () {
                        var tabName = tab.getAttribute("data-auth-tab");
                        authTabs.forEach(function (button) { button.classList.toggle("active", button === tab); });
                        if (loginForm) loginForm.style.display = tabName === "login" ? "block" : "none";
                        if (registerForm) registerForm.style.display = tabName === "register" ? "block" : "none";
                    });
                });
            }

            if (loginForm && !loginForm.dataset.authBound) {
                loginForm.dataset.authBound = "1";
                loginForm.addEventListener("submit", function (event) {
                    event.preventDefault();
                    var email = (document.getElementById("loginEmail") || {}).value || "";
                    var password = (document.getElementById("loginPassword") || {}).value || "";
                    var foundUser = readAccounts().find(function (account) {
                        return String(account.email || "").trim().toLowerCase() === String(email).trim().toLowerCase() && String(account.password || "") === String(password);
                    });

                    if (!foundUser) {
                        notify("Invalid email or password.");
                        return;
                    }

                    setCurrentUser(foundUser);
                    notify("Welcome back, " + (foundUser.firstName || "Explorer") + "!");
                    renderAccountPage();
                });
            }

            if (registerForm && !registerForm.dataset.authBound) {
                registerForm.dataset.authBound = "1";
                registerForm.addEventListener("submit", function (event) {
                    event.preventDefault();
                    var email = (document.getElementById("registerEmail") || {}).value || "";
                    var password = (document.getElementById("registerPassword") || {}).value || "";
                    var firstName = (document.getElementById("registerFirstName") || {}).value || "";
                    var lastName = (document.getElementById("registerLastName") || {}).value || "";
                    var phone = (document.getElementById("registerPhone") || {}).value || "";

                    if (!firstName || !lastName || !email || !password) {
                        notify("Please fill in all required fields.");
                        return;
                    }
                    if (password.length < 6) {
                        notify("Password must be at least 6 characters long.");
                        return;
                    }

                    var accounts = readAccounts();
                    if (accounts.some(function (account) {
                        return String(account.email || "").trim().toLowerCase() === String(email).trim().toLowerCase();
                    })) {
                        notify("An account with this email already exists.");
                        return;
                    }

                    var newUser = {
                        id: "user_" + Date.now(),
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        email: String(email).trim().toLowerCase(),
                        phone: phone.trim(),
                        password: String(password),
                        dob: "",
                        gender: "",
                        settings: {
                            emailNotif: true,
                            smsNotif: false,
                            newsNotif: true,
                            publicProfile: false
                        },
                        addresses: []
                    };

                    accounts.push(newUser);
                    writeAccounts(accounts);
                    setCurrentUser(newUser);
                    notify("Account created successfully.");
                    renderAccountPage();
                });
            }

            return;
        }

        if (authShell) authShell.style.display = "none";
        if (accountContent) accountContent.style.display = "block";

        if (user) {
            user.innerHTML = '<h3 style="margin-bottom:8px;">' + (currentUser.firstName || "Explorer") + ' ' + (currentUser.lastName || "Member") + '</h3><p style="color:#999;">' + (currentUser.email || "member@thenorthface.local") + '</p>';
        }

        var sections = {
            dashboard: $("dashboardSection"),
            orders: $("ordersSection"),
            addresses: $("addressesSection"),
            wishlist: $("wishlistSection"),
            profile: $("profileSection"),
            settings: $("settingsSection")
        };

        document.querySelectorAll(".account-nav-link[data-section]").forEach(function (link) {
            if (link.dataset.navBound === "1") return;
            link.dataset.navBound = "1";
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

        if ($("totalOrders")) $("totalOrders").textContent = String((currentUser.orders || []).length || 0);
        var wishlist = readWishlist();
        if ($("wishlistCount")) $("wishlistCount").textContent = String(wishlist.length);
        if ($("totalSpent")) $("totalSpent").textContent = "$0.00";
        if ($("rewardPoints")) $("rewardPoints").textContent = String((currentUser.rewardPoints || 0));

        if ($("recentOrdersList")) {
            var orderHistory = Array.isArray(currentUser.orders) && currentUser.orders.length ? currentUser.orders : [];
            $("recentOrdersList").innerHTML = orderHistory.length ? orderHistory.slice(0, 2).map(function (entry) {
                return '<p style="margin-bottom:8px;">' + entry.number + ' - ' + entry.status + '</p>';
            }).join("") : '<p style="margin-bottom:8px;">No orders yet.</p>';
        }
        if ($("ordersList")) $("ordersList").innerHTML = "<p>Use the filter to browse your order history.</p>";
        if ($("addressesList")) {
            renderAccountAddresses(Array.isArray(currentUser.addresses) ? currentUser.addresses : []);
        }

        var accountSettings = Object.assign({
            emailNotif: true,
            smsNotif: false,
            newsNotif: true,
            publicProfile: false
        }, currentUser.settings || {});
        ["emailNotif", "smsNotif", "newsNotif", "publicProfile"].forEach(function (settingId) {
            var setting = $(settingId);
            if (!setting) return;

            setting.checked = Boolean(accountSettings[settingId]);
            if (setting.dataset.settingsBound === "1") return;
            setting.dataset.settingsBound = "1";
            setting.addEventListener("change", function () {
                var settings = {};
                ["emailNotif", "smsNotif", "newsNotif", "publicProfile"].forEach(function (id) {
                    var checkbox = $(id);
                    if (checkbox) settings[id] = checkbox.checked;
                });
                saveCurrentUserProfile({ settings: settings });
                if ($("profileSummaryBadge")) {
                    $("profileSummaryBadge").textContent = settings.publicProfile ? "Public Profile" : "Active Member";
                }
                notify("Settings saved.");
            });
        });

        renderAccountWishlist();

        if ($("addAddressBtn") && $("addressForm")) {
            if ($("addAddressBtn").dataset.addressBound !== "1") {
                $("addAddressBtn").dataset.addressBound = "1";
                $("addAddressBtn").addEventListener("click", function () { $("addressForm").style.display = "block"; });
            }
        }
        if ($("cancelAddressBtn") && $("addressForm")) {
            if ($("cancelAddressBtn").dataset.addressBound !== "1") {
                $("cancelAddressBtn").dataset.addressBound = "1";
                $("cancelAddressBtn").addEventListener("click", function () { $("addressForm").style.display = "none"; });
            }
        }
        if ($("addressDetailsForm") && $("addressDetailsForm").dataset.addressBound !== "1") {
            var addressForm = $("addressDetailsForm");
            addressForm.dataset.addressBound = "1";
            addressForm.addEventListener("submit", function (event) {
                event.preventDefault();
                var addresses = Array.isArray(currentUser.addresses) ? currentUser.addresses.slice() : [];
                var isDefault = $("defaultAddress").checked;
                if (isDefault) addresses.forEach(function (address) { address.default = false; });
                addresses.push({
                    street: $("addrStreet").value.trim(),
                    city: $("addrCity").value.trim(),
                    state: $("addrState").value.trim(),
                    zip: $("addrZip").value.trim(),
                    country: $("addrCountry").value,
                    default: isDefault || addresses.length === 0
                });
                saveCurrentUserProfile({ addresses: addresses });
                currentUser.addresses = addresses;
                renderAccountAddresses(addresses);
                addressForm.reset();
                $("addressForm").style.display = "none";
                notify("Address saved.");
            });
        }

        if ($("profileForm")) {
            var profileForm = $("profileForm");
            if (!profileForm.dataset.profileBound) {
                profileForm.dataset.profileBound = "1";
                profileForm.addEventListener("submit", function (event) {
                    event.preventDefault();
                    var updated = {
                        firstName: $("profileFirstName").value,
                        lastName: $("profileLastName").value,
                        email: $("profileEmail").value,
                        phone: $("profilePhone").value,
                        dob: $("profileDOB").value,
                        gender: $("profileGender").value
                    };

                    var normalizedEmail = String(updated.email || "").trim().toLowerCase();
                    var duplicate = readAccounts().find(function (account) {
                        return account.id !== currentUser.id && String(account.email || "").trim().toLowerCase() === normalizedEmail;
                    });

                    if (duplicate) {
                        notify("This email is already in use by another account.");
                        return;
                    }

                    saveCurrentUserProfile(updated);
                    notify("Profile updated.");
                    renderAccountPage();
                });
            }

            var fullName = [currentUser.firstName, currentUser.lastName].filter(Boolean).join(" ") || "New Member";
            var initials = (currentUser.firstName || "N").charAt(0).toUpperCase() + (currentUser.lastName || "M").charAt(0).toUpperCase();

            $("profileFirstName").value = currentUser.firstName || "";
            $("profileLastName").value = currentUser.lastName || "";
            $("profileEmail").value = currentUser.email || "";
            $("profilePhone").value = currentUser.phone || "";
            $("profileDOB").value = currentUser.dob || "";
            $("profileGender").value = currentUser.gender || "";

            if ($("profileDisplayName")) $("profileDisplayName").textContent = fullName;
            if ($("profileDisplayEmail")) $("profileDisplayEmail").textContent = currentUser.email || "member@thenorthface.local";
            if ($("profileAvatarInitials")) $("profileAvatarInitials").textContent = initials;
            if ($("profileSummaryBadge")) $("profileSummaryBadge").textContent = currentUser.settings && currentUser.settings.publicProfile ? "Public Profile" : "Active Member";
        }

        if ($("logoutLink")) {
            $("logoutLink").addEventListener("click", function (event) {
                event.preventDefault();
                clearCurrentUser();
                notify("Logged out.");
                window.location.href = "index.html";
            });
        }
    }

    function renderAccountAddresses(addresses) {
        var list = $("addressesList");
        if (!list) return;

        list.className = "address-list";
        if (!addresses.length) {
            list.innerHTML = "<p>No saved addresses yet.</p>";
            return;
        }

        list.innerHTML = addresses.map(function (address, index) {
            var addressText = [address.street, address.city, address.state, address.zip, address.country].filter(Boolean).join(", ");
            return '<article class="address-card' + (address.default ? " default" : "") + '">' +
                '<h3>Address ' + (index + 1) + '</h3>' +
                '<p>' + addressText + '</p>' +
                (address.default ? '<span class="address-default-label">Default address</span>' : "") +
                '</article>';
        }).join("");
    }

    function renderAccountWishlist() {
        var grid = $("wishlistGrid");
        if (!grid) return;

        var wishlistProducts = readWishlist().map(function (id) {
            return PRODUCTS.find(function (product) { return product.id === id; });
        }).filter(Boolean);
        grid.innerHTML = wishlistProducts.length ? wishlistProducts.map(buildProductCard).join("") : '<p class="empty-wishlist">Your wishlist is empty.</p>';
        bindAddToCartButtons();
    }

    function renderWishlistPage() {
        var grid = $("wishlistPageGrid");
        if (!grid) return;

        var wishlist = readWishlist();
        var urlItems = readWishlistFromUrl();
        var mergedWishlist = wishlist.concat(urlItems.filter(function (id) {
            return wishlist.indexOf(id) === -1;
        }));
        if (mergedWishlist.length !== wishlist.length) writeWishlist(mergedWishlist);

        var wishlistProducts = mergedWishlist.map(function (id) {
            return PRODUCTS.find(function (product) { return product.id === id; });
        }).filter(Boolean);

        grid.innerHTML = wishlistProducts.length ? wishlistProducts.map(buildProductCard).join("") :
            '<div class="empty-wishlist"><i class="far fa-heart"></i><h2>Your wishlist is empty</h2><p>Save products here to find them again later.</p><a class="btn btn-primary" href="products.html">Browse Products</a></div>';
        bindAddToCartButtons();
    }

    function initCartPage() {
        renderFeaturedProducts();
        renderProductsPage();
        renderProductDetail();
        renderCartPage();
        renderCheckoutPage();
        renderAccountPage();
        renderWishlistPage();
        bindWishlistNavigation();

        window.addEventListener("tnf:wishlist-updated", function () {
            renderAccountWishlist();
            renderWishlistPage();
        });
        window.addEventListener("storage", function (event) {
            if (event.key === WISHLIST_KEY) {
                renderAccountWishlist();
                renderWishlistPage();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initCartPage);
    } else {
        initCartPage();
    }
})();
