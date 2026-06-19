(function () {
    function $(id) {
        return document.getElementById(id);
    }

    function getCart() {
        try {
            return JSON.parse(localStorage.getItem("tnf_cart") || "[]");
        } catch (error) {
            return [];
        }
    }

    function updateCartBadge() {
        var count = getCart().reduce(function (sum, item) {
            return sum + (item.quantity || 0);
        }, 0);

        document.querySelectorAll("#cartCount").forEach(function (node) {
            node.textContent = String(count);
        });
    }

    function initMobileMenu() {
        var hamburger = $("hamburger");
        var navMenu = document.querySelector(".nav-menu");
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }

    function initSearchBar() {
        var searchBtn = $("searchBtn");
        var closeSearch = $("closeSearch");
        var searchBar = $("searchBar");
        var searchInput = $("searchInput");
        var searchSubmit = $("searchSubmit");

        if (searchBtn && searchBar) {
            searchBtn.addEventListener("click", function () {
                searchBar.classList.add("active");
                if (searchInput) searchInput.focus();
            });
        }

        if (closeSearch && searchBar) {
            closeSearch.addEventListener("click", function () {
                searchBar.classList.remove("active");
            });
        }

        if (searchSubmit && searchInput) {
            searchSubmit.addEventListener("click", function () {
                var term = searchInput.value.trim();
                if (!term) return;
                window.location.href = "products.html?search=" + encodeURIComponent(term);
            });
        }

        if (searchInput) {
            searchInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    event.preventDefault();
                    if (searchSubmit) searchSubmit.click();
                }
            });
        }
    }

    function initUserModal() {
        var userBtn = $("userBtn");
        var userModal = $("userModal");
        if (!userBtn || !userModal) return;

        var closeBtn = userModal.querySelector(".close");
        var userContent = $("userContent");

        userBtn.addEventListener("click", function () {
            if (userContent) {
                userContent.innerHTML = "" +
                    "<p style=\"margin-bottom: 16px;\">You are browsing as a guest user.</p>" +
                    "<a class=\"btn btn-primary btn-full\" href=\"user-account.html\">Open Account</a>";
            }
            userModal.classList.add("active");
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", function () {
                userModal.classList.remove("active");
            });
        }

        userModal.addEventListener("click", function (event) {
            if (event.target === userModal) {
                userModal.classList.remove("active");
            }
        });
    }

    function initSimpleForms() {
        var newsletterForm = $("newsletterForm");
        if (newsletterForm) {
            newsletterForm.addEventListener("submit", function (event) {
                event.preventDefault();
                alert("Thanks for subscribing.");
                newsletterForm.reset();
            });
        }

        var contactForm = $("contactForm");
        if (contactForm) {
            contactForm.addEventListener("submit", function (event) {
                event.preventDefault();
                alert("Message sent. We will get back to you shortly.");
                contactForm.reset();
            });
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        initMobileMenu();
        initSearchBar();
        initUserModal();
        initSimpleForms();
        updateCartBadge();
    });

    window.TNF = window.TNF || {};
    window.TNF.updateCartBadge = updateCartBadge;
})();
