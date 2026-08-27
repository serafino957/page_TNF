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

    var translations = {
        uk: {
            "Home": "Головна",
            "Shop": "Магазин",
            "About": "Про нас",
            "Contact": "Контакти",
            "Language": "Мова",
            "Select language": "Вибрати мову",
            "Search for products...": "Пошук товарів...",
            "Explore the Outdoors": "Відкрийте світ природи",
            "Premium gear for your next adventure": "Преміальне спорядження для наступної пригоди",
            "Shop Now": "Купити зараз",
            "Featured Products": "Рекомендовані товари",
            "Shop by Category": "Купуйте за категоріями",
            "View All": "Переглянути все",
            "Jackets": "Куртки",
            "Backpacks": "Рюкзаки",
            "Footwear": "Взуття",
            "Accessories": "Аксесуари",
            "Tents": "Намети",
            "Sleeping Bags": "Спальні мішки",
            "Contact Us": "Зв'яжіться з нами",
            "Shopping Cart": "Кошик",
            "Your cart is empty": "Ваш кошик порожній",
            "Continue Shopping": "Продовжити покупки",
            "Add to Cart": "Додати до кошика",
            "Checkout": "Оформити замовлення",
            "About Us": "Про нас",
            "Open Account": "Відкрити обліковий запис",
            "Products": "Товари",
            "Product": "Товар",
            "Product Image": "Зображення товару",
            "Description": "Опис",
            "Details": "Деталі",
            "Specifications": "Характеристики",
            "Reviews": "Відгуки",
            "Color": "Колір",
            "Color option": "Варіант кольору",
            "Quantity": "Кількість",
            "Size": "Розмір",
            "Select a size": "Виберіть розмір",
            "Add to Cart": "Додати до кошика",
            "Add to Wishlist": "Додати до списку бажань",
            "Free Shipping": "Безкоштовна доставка",
            "On orders over $100": "Для замовлень понад $100",
            "Easy Returns": "Просте повернення",
            "30-day return policy": "Політика повернення протягом 30 днів",
            "Secure Payment": "Безпечна оплата",
            "Encrypted transactions": "Зашифровані транзакції",
            "In stock": "У наявності",
            "Filters": "Фільтри",
            "Category": "Категорія",
            "Price Range": "Діапазон цін",
            "Rating": "Рейтинг",
            "Clear Filters": "Очистити фільтри",
            "Showing": "Показано",
            "products": "товарів",
            "Sort by:": "Сортувати за:",
            "Featured": "Рекомендовані",
            "Price: Low to High": "Ціна: від низької до високої",
            "Price: High to Low": "Ціна: від високої до низької",
            "Newest": "Найновіші",
            "Top Rated": "Найвищий рейтинг",
            "One Size": "Єдиний розмір",
            "Apex Insulated Jacket": "Утеплена куртка Apex",
            "Windproof Shell": "Вітрозахисна куртка Shell",
            "Alpine Trail Backpack": "Рюкзак Alpine Trail",
            "Basecamp Duffel": "Сумка Basecamp Duffel",
            "Ridge Hiker Boots": "Черевики Ridge Hiker",
            "Summit Thermal Gloves": "Термальні рукавички Summit",
            "Summit Trail Tent": "Намет Summit Trail",
            "Basecamp Sleeping Bag": "Спальний мішок Basecamp",
            "A warm insulated jacket for cold trail days, with lightweight protection against wind and light rain.": "Тепла утеплена куртка для холодних днів на маршруті з легким захистом від вітру та невеликого дощу.",
            "A lightweight shell built to block strong wind while keeping you comfortable during fast-moving adventures.": "Легка куртка, створена для захисту від сильного вітру та комфорту під час активних пригод.",
            "A versatile 28-liter daypack with organized storage for mountain hikes, commutes, and weekend exploration.": "Універсальний рюкзак об'ємом 28 літрів з продуманим зберіганням для гірських походів, поїздок і подорожей на вихідні.",
            "A rugged, spacious duffel designed to carry everything you need for basecamp, travel, or the gym.": "Містка міцна сумка для всього необхідного в базовому таборі, подорожі чи спортзалі.",
            "Supportive waterproof hiking boots with dependable traction for rocky trails and changing mountain weather.": "Надійні водостійкі трекінгові черевики зі стійкою підошвою для кам'янистих маршрутів і мінливої гірської погоди.",
            "Warm, dexterous gloves that protect your hands from the cold while keeping touchscreen control close at hand.": "Теплі зручні рукавички, які захищають руки від холоду та дають змогу користуватися сенсорним екраном.",
            "Water-resistant shell": "Водостійкий зовнішній матеріал", "Synthetic insulation": "Синтетичний утеплювач", "Adjustable hood": "Регульований капюшон", "Three zip pockets": "Три кишені на блискавці",
            "Windproof construction": "Вітрозахисна конструкція", "Breathable fabric": "Повітропроникна тканина", "Sealed seams": "Герметичні шви", "Packable design": "Компактна конструкція",
            "28L capacity": "Об'єм 28 л", "Padded laptop sleeve": "М'яке відділення для ноутбука", "Hydration compatible": "Сумісність із системою гідратації", "Adjustable shoulder straps": "Регульовані плечові ремені",
            "Durable recycled fabric": "Міцна перероблена тканина", "71L capacity": "Об'єм 71 л", "Removable shoulder strap": "Знімний плечовий ремінь", "Separate shoe compartment": "Окреме відділення для взуття",
            "Waterproof leather upper": "Водостійкий шкіряний верх", "Vibram traction outsole": "Підошва Vibram із надійним зчепленням", "EVA cushioning": "Амортизація EVA", "Protective toe cap": "Захисний носок",
            "Thermal fleece lining": "Тепла флісова підкладка", "Touchscreen compatible": "Сумісність із сенсорним екраном", "Grippy palm": "Долоня з надійним зчепленням", "Elastic wrist cuff": "Еластична манжета на зап'ясті",
            "Feature": "Характеристика", "Details": "Деталі", "Available sizes": "Доступні розміри",
            "Your wishlist is empty": "Ваш список бажань порожній", "Save products here to find them again later.": "Зберігайте тут товари, щоб легко знайти їх пізніше.", "Browse Products": "Переглянути товари", "Open Full Wishlist": "Відкрити весь список бажань",
            "Products you want to keep close.": "Товари, які ви хочете зберегти поруч.",
            "Added to wishlist.": "Додано до списку бажань.", "Removed from wishlist.": "Видалено зі списку бажань.", "Remove from Wishlist": "Видалити зі списку бажань",
            "Remove": "Видалити",
            "Your cart is empty": "Ваш кошик порожній",
            "Start shopping to add items to your cart": "Почніть покупки, щоб додати товари до кошика",
            "Order Summary": "Підсумок замовлення",
            "Subtotal:": "Проміжний підсумок:",
            "Shipping:": "Доставка:",
            "Tax:": "Податок:",
            "Promo Code": "Промокод",
            "Enter promo code": "Введіть промокод",
            "Apply": "Застосувати",
            "Discount:": "Знижка:",
            "Proceed to Checkout": "Перейти до оформлення",
            "Checkout": "Оформлення замовлення",
            "Shipping": "Доставка",
            "Payment": "Оплата",
            "Review": "Перевірка",
            "Shipping Information": "Інформація про доставку",
            "First Name": "Ім'я",
            "Last Name": "Прізвище",
            "Email Address": "Електронна адреса",
            "Phone Number": "Номер телефону",
            "Street Address": "Адреса",
            "City": "Місто",
            "State/Province": "Штат/область",
            "ZIP/Postal Code": "Поштовий індекс",
            "Country": "Країна",
            "Select Country": "Виберіть країну",
            "United States": "Сполучені Штати",
            "Canada": "Канада",
            "United Kingdom": "Велика Британія",
            "Ukraine": "Україна",
            "Australia": "Австралія",
            "Shipping Method": "Спосіб доставки",
            "Standard Shipping": "Стандартна доставка",
            "Express Shipping": "Експрес-доставка",
            "Overnight Shipping": "Нічна доставка",
            "business days": "робочих днів",
            "Back to Cart": "Назад до кошика",
            "Continue to Payment": "Продовжити до оплати",
            "Payment Method": "Спосіб оплати",
            "Credit/Debit Card": "Кредитна/дебетова картка",
            "Card Details": "Дані картки",
            "Cardholder Name": "Ім'я власника картки",
            "Card Number": "Номер картки",
            "Expiry": "Термін дії",
            "CVV": "CVV",
            "Place Order": "Розмістити замовлення",
            "Dashboard": "Панель керування",
            "Orders": "Замовлення",
            "Addresses": "Адреси",
            "Wishlist": "Список бажань",
            "Profile": "Профіль",
            "Settings": "Налаштування",
            "Explorer Member": "Учасник Explorer",
            "My Addresses": "Мої адреси",
            "Add New Address": "Додати нову адресу",
            "Address Details": "Дані адреси",
            "Set as default address": "Зробити адресою за замовчуванням",
            "Cancel": "Скасувати",
            "Save Address": "Зберегти адресу",
            "My Wishlist": "Мій список бажань",
            "Profile Information": "Інформація профілю",
            "Contact Us": "Зв'яжіться з нами",
            "Send us a Message": "Надішліть нам повідомлення",
            "Full Name": "Повне ім'я",
            "Subject": "Тема",
            "Select a subject": "Виберіть тему",
            "Message": "Повідомлення",
            "Send Message": "Надіслати повідомлення",
            "Get in Touch": "Зв'яжіться з нами",
            "Address": "Адреса",
            "Phone": "Телефон",
            "Email": "Електронна пошта",
            "Business Hours": "Години роботи",
            "Follow Us": "Стежте за нами",
            "About The North Face": "Про The North Face",
            "Our Story": "Наша історія",
            "Our Values": "Наші цінності",
            "Our Team": "Наша команда",
            "Adventure": "Пригоди",
            "Sustainability": "Сталий розвиток",
            "Community": "Спільнота",
            "Innovation": "Інновації",
            "Careers": "Кар'єра",
            "Press": "Преса",
            "Blog": "Блог",
            "Customer Service": "Служба підтримки",
            "Thanks for subscribing.": "Дякуємо за підписку.",
            "Message sent. We will get back to you shortly.": "Повідомлення надіслано. Ми скоро з вами зв'яжемося."
        }
    };

    translations.uk = Object.assign(translations.uk, {
        "Legal": "Правова інформація", "Shipping Info": "Інформація про доставку",
        "Returns": "Повернення", "FAQ": "Часті запитання", "Privacy Policy": "Політика конфіденційності",
        "Terms of Service": "Умови використання", "Cookie Policy": "Політика cookies",
        "Accessibility": "Доступність", "All rights reserved.": "Усі права захищено.",
        "Equipping adventurers since 1966": "Споряджаємо мандрівників із 1966 року",
        "The North Face was founded in 1966 in San Francisco as a small mountaineering retailer. What started as a passion for the outdoors has grown into a global leader in outdoor apparel, footwear, and equipment.": "The North Face засновано 1966 року в Сан-Франциско як невеликий магазин альпіністського спорядження. Те, що починалося як захоплення природою, перетворилося на світового лідера у виробництві одягу, взуття та спорядження для активного відпочинку.",
        "Our mission has always been simple: to equip adventurers with the gear they need to explore the world safely and comfortably. From climbers ascending the world's highest peaks to hikers exploring local trails, our products are designed for those who refuse to be confined by walls.": "Наша місія завжди була простою: забезпечувати мандрівників спорядженням, необхідним для безпечного й комфортного пізнання світу. Від альпіністів, які підкорюють найвищі вершини, до туристів, що досліджують місцеві маршрути, наші товари створені для тих, хто не бажає обмежувати себе стінами.",
        "We celebrate the spirit of exploration and adventure": "Ми прославляємо дух досліджень і пригод",
        "Protecting the environment for future generations": "Захищаємо довкілля для майбутніх поколінь",
        "Building connections with adventurers worldwide": "Створюємо зв'язки з мандрівниками по всьому світу",
        "Continuously improving our products and services": "Постійно вдосконалюємо наші товари та послуги",
        "Meet the passionate individuals behind The North Face": "Познайомтеся з натхненними людьми, які створюють The North Face",
        "Chief Executive Officer": "Генеральний директор", "Chief Product Officer": "Директор із продуктів",
        "VP of Sustainability": "Віцепрезидент зі сталого розвитку", "VP of Marketing": "Віцепрезидент із маркетингу",
        "Leading The North Face with a vision for sustainable growth and innovation.": "Керує The North Face, розвиваючи бачення сталого зростання та інновацій.",
        "Driving product innovation and ensuring the highest quality standards.": "Розвиває інновації продуктів і забезпечує найвищі стандарти якості.",
        "Committed to making The North Face a leader in environmental responsibility.": "Прагне зробити The North Face лідером у сфері екологічної відповідальності.",
        "Connecting with adventurers and building our global community.": "Об'єднує мандрівників і розвиває нашу глобальну спільноту.",
        "By The Numbers": "У цифрах", "Years in Business": "Років роботи", "Countries": "Країн",
        "Happy Customers": "Задоволених клієнтів", "Retail Locations": "Роздрібних магазинів",
        "Recognition": "Визнання", "Proud recipient of numerous industry awards": "Ми пишаємося численними галузевими нагородами",
        "Best Outdoor Brand": "Найкращий бренд для активного відпочинку", "Innovation Award": "Нагорода за інновації",
        "Sustainability Leader": "Лідер сталого розвитку", "Customer Choice": "Вибір клієнтів",
        "Our Journey": "Наш шлях", "Founded": "Заснування", "The North Face is established in San Francisco": "The North Face засновано в Сан-Франциско",
        "Expansion": "Розширення", "Opened first retail stores across the United States": "Відкрито перші магазини по всіх Сполучених Штатах",
        "International Growth": "Міжнародне зростання", "Expanded operations to Europe and Asia": "Діяльність розширено на Європу та Азію",
        "Digital Revolution": "Цифрова революція", "Launched e-commerce platform": "Запущено платформу електронної комерції",
        "Sustainability Focus": "Фокус на сталому розвитку", "Committed to environmental responsibility": "Взято зобов'язання щодо захисту довкілля",
        "Digital First": "Цифровий пріоритет", "Transformed into an omnichannel leader": "Компанія стала лідером омніканального ритейлу",
        "Our Commitment to Sustainability": "Наше зобов'язання щодо сталого розвитку",
        "At The North Face, we believe that protecting the environment is essential to our mission. We've committed to reducing our carbon footprint, using sustainable materials, and supporting conservation efforts worldwide.": "У The North Face ми вважаємо захист довкілля невід'ємною частиною нашої місії. Ми зобов'язалися зменшувати вуглецевий слід, використовувати сталі матеріали та підтримувати природоохоронні ініціативи по всьому світу.",
        "100% Recycled Materials": "100% перероблених матеріалів", "Working towards using sustainable and recycled materials in all products": "Працюємо над використанням сталих і перероблених матеріалів у всіх товарах",
        "Aiming for carbon neutrality in operations by 2030": "Прагнемо до вуглецевої нейтральності операцій до 2030 року",
        "Supporting global conservation initiatives and protected lands": "Підтримуємо глобальні природоохоронні ініціативи та заповідні території",
        "Ready to Explore?": "Готові до пригод?", "Join millions of adventurers who trust The North Face": "Приєднуйтеся до мільйонів мандрівників, які довіряють The North Face",
        "Company information": "Інформація про компанію", "Customer support information": "Інформація про підтримку",
        "Join a team building better gear and more responsible ways to explore the outdoors. Send your profile to careers@thenorthface.local.": "Приєднуйтеся до команди, яка створює краще спорядження та відповідальніші способи досліджувати природу. Надішліть своє резюме на careers@thenorthface.local.",
        "For media requests, product information, and brand materials, contact press@thenorthface.local.": "Із запитами від медіа, інформацією про товари та матеріалами бренду звертайтеся на press@thenorthface.local.",
        "Stories, field notes, and practical inspiration for your next adventure are coming soon.": "Історії, польові нотатки та практичне натхнення для наступної пригоди незабаром з'являться тут.",
        "We use your information only to process orders, provide support, and improve this demo storefront. We do not sell personal data.": "Ми використовуємо вашу інформацію лише для обробки замовлень, надання підтримки та покращення цього демонстраційного магазину. Ми не продаємо персональні дані.",
        "By using this storefront, you agree to provide accurate order details and use the service lawfully.": "Користуючись цим магазином, ви погоджуєтеся надавати точні дані замовлення та використовувати сервіс законно.",
        "This site stores language, cart, and checkout preferences locally in your browser.": "Цей сайт зберігає мовні налаштування, кошик і дані оформлення локально у вашому браузері.",
        "We are committed to clear navigation, keyboard-friendly controls, readable contrast, and useful alternative text.": "Ми прагнемо забезпечити зрозумілу навігацію, керування з клавіатури, читабельний контраст і корисні альтернативні описи.",
        "We're here to help and answer any question you might have": "Ми готові допомогти та відповісти на будь-які ваші запитання",
        "Frequently Asked Questions": "Часті запитання",
        "Product Inquiry": "Запит щодо товару", "Order Status": "Статус замовлення",
        "Returns & Exchanges": "Повернення та обмін", "Technical Issue": "Технічна проблема",
        "Feedback": "Відгук", "Partnership Opportunity": "Можливість партнерства", "Other": "Інше",
        "I agree to the Privacy Policy": "Я погоджуюся з Політикою конфіденційності",
        "US:": "США:", "International:": "Міжнародний номер:", "Mon-Fri:": "Пн-Пт:",
        "General:": "Загальні питання:", "Support:": "Підтримка:", "Sales:": "Продажі:",
        "Monday - Friday:": "Понеділок - п'ятниця:", "Saturday:": "Субота:", "Sunday:": "Неділя:",
        "Closed": "Зачинено", "Find Us": "Де нас знайти",
        "What is your return policy?": "Яка у вас політика повернення?",
        "We offer a 30-day return policy for all items in original condition with tags attached. Items must be unworn and unwashed. Refunds are processed within 5-7 business days of receiving the returned item.": "Ми приймаємо повернення протягом 30 днів для всіх товарів у первісному стані з прикріпленими бірками. Товари не повинні бути ношеними або випраними. Повернення коштів здійснюється протягом 5-7 робочих днів після отримання поверненого товару.",
        "How long does shipping take?": "Скільки триває доставка?",
        "Standard shipping typically takes 5-7 business days. Express shipping is 2-3 business days, and overnight shipping is available for 1-day delivery. International orders may take 10-15 business days.": "Стандартна доставка зазвичай триває 5-7 робочих днів. Експрес-доставка займає 2-3 робочі дні, а нічна доставка доступна для доставки за 1 день. Міжнародні замовлення можуть доставлятися 10-15 робочих днів.",
        "Do you offer free shipping?": "Чи є у вас безкоштовна доставка?",
        "Yes! We offer free standard shipping on orders over $100. For orders under $100, standard shipping costs $10. Express and overnight shipping options are available at additional costs.": "Так! Ми пропонуємо безкоштовну стандартну доставку для замовлень понад $100. Для замовлень до $100 стандартна доставка коштує $10. Експрес- і нічна доставка доступні за додаткову плату.",
        "How do I track my order?": "Як відстежити моє замовлення?",
        "Once your order ships, you'll receive an email with a tracking number. You can use this number on our website or the carrier's website to track your package in real-time.": "Після відправлення замовлення ви отримаєте email із номером для відстеження. Використовуйте цей номер на нашому сайті або сайті перевізника, щоб відстежувати посилку в реальному часі.",
        "What sizes do you carry?": "Які розміри у вас доступні?",
        "We carry sizes XS through XXL for most clothing items. Shoe sizes range from US 5 to US 16. Check individual product pages for specific size availability.": "Для більшості одягу доступні розміри від XS до XXL. Розміри взуття - від US 5 до US 16. Перевіряйте сторінку конкретного товару, щоб дізнатися про доступні розміри.",
        "Do you have a physical store?": "Чи маєте ви фізичний магазин?",
        "Yes! We have over 500 retail locations worldwide. Use our store locator on the website to find the nearest location, hours, and contact information.": "Так! У нас понад 500 магазинів по всьому світу. Скористайтеся пошуком магазинів на сайті, щоб знайти найближчу адресу, години роботи та контактну інформацію.",
        "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. Orders over $100 qualify for free shipping.": "Стандартна доставка триває 5-7 робочих днів. Експрес-доставка займає 2-3 робочі дні. Замовлення понад $100 мають право на безкоштовну доставку.",
        "Unused items can be returned within 30 days. Contact our support team to start a return or exchange.": "Невикористані товари можна повернути протягом 30 днів. Зверніться до служби підтримки, щоб розпочати повернення або обмін.",
        "Need help with an order, size, or delivery? Send us a message using the form above and our team will respond shortly.": "Потрібна допомога із замовленням, розміром або доставкою? Надішліть повідомлення через форму вище, і наша команда скоро відповість."
    }, {
        "to": "до", "Cart": "кошика", "Added": "Додано", "added": "додано",
        "order": "замовлення", "Order": "Замовлення", "Total:": "Разом:",
        "Price": "Ціна", "Low": "низька", "High": "висока", "and": "і",
        "All": "Усі", "View": "Переглянути", "More": "більше", "Years": "років",
        "in": "у", "Business": "бізнесі", "Countries": "країн", "Read": "Читати",
        "More": "більше", "Learn": "Дізнатися", "Our": "Наш", "Mission": "Місія",
        "Name": "Ім'я", "Number": "Номер", "Details": "Деталі", "Save": "Зберегти",
        "Edit": "Редагувати", "Close": "Закрити", "Next": "Далі", "Back": "Назад",
        "Delivered": "Доставлено", "Processing": "В обробці", "Invalid": "Недійсний",
        "Try": "Спробуйте", "Please": "Будь ласка", "complete": "заповніть",
        "all": "усі", "shipping": "доставки", "fields": "поля", "valid": "дійсну",
        "email": "електронну адресу", "required": "обов'язково", "successfully": "успішно",
        "Filter": "Фільтр", "Use": "Використовуйте", "the": "", "filter": "фільтр",
        "browse": "перегляду", "your": "вашої", "history": "історії", "Set": "Встановити",
        "default": "за замовчуванням", "address": "адресу", "Monday": "Понеділок",
        "Tuesday": "Вівторок", "Wednesday": "Середа", "Thursday": "Четвер",
        "Friday": "П'ятниця", "Saturday": "Субота", "Sunday": "Неділя",
        "January": "січень", "February": "лютий", "March": "березень", "April": "квітень",
        "May": "травень", "June": "червень", "July": "липень", "August": "серпень",
        "September": "вересень", "October": "жовтень", "November": "листопад", "December": "грудень"
    });

    function translateValue(value, language) {
        if (language === "en") return value;
        var dictionary = translations[language] || {};
        if (dictionary[value]) return dictionary[value];

        return Object.keys(dictionary).sort(function (a, b) {
            return b.length - a.length;
        }).reduce(function (result, source) {
            var target = dictionary[source];
            if (!source || target === undefined) return result;
            var pattern = new RegExp("\\b" + source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "gi");
            return result.replace(pattern, target);
        }, value);
    }

    function translatePage(language) {
        var dictionary = translations[language] || {};
        var nodes = document.querySelectorAll("body *:not(script):not(style):not(select)");

        nodes.forEach(function (element) {
            element.childNodes.forEach(function (node) {
                if (node.nodeType !== 3) return;
                var original = node.nodeValue.trim();
                if (!original) return;
                if (!node.__tnfOriginalText) node.__tnfOriginalText = original;
                var source = node.__tnfOriginalText;
                node.nodeValue = translateValue(source, language);
            });
        });

        document.querySelectorAll("[placeholder], [title], [aria-label], [alt], option").forEach(function (element) {
            var attribute = element.tagName === "OPTION" ? "textContent" : (element.hasAttribute("placeholder") ? "placeholder" : (element.hasAttribute("title") ? "title" : (element.hasAttribute("aria-label") ? "aria-label" : "alt")));
            if (attribute === "textContent") {
                if (!element.__tnfOriginalText) element.__tnfOriginalText = element.textContent.trim();
                var optionSource = element.__tnfOriginalText;
                var translatedOption = translateValue(optionSource, language);
                if (element.firstChild && element.firstChild.nodeType === 3) {
                    element.firstChild.nodeValue = translatedOption;
                }
                return;
            }
            var originalAttribute = "original" + attribute.charAt(0).toUpperCase() + attribute.slice(1);
            if (!element.dataset[originalAttribute]) {
                element.dataset[originalAttribute] = element.getAttribute(attribute);
            }
            var source = element.dataset[originalAttribute];
            element.setAttribute(attribute, translateValue(source, language));
        });

        document.documentElement.lang = language;
        document.title = language === "uk" ? "The North Face | Спорядження для активного відпочинку" : "The North Face | Premium Outdoor Gear";
    }

    function initLanguageSwitcher() {
        var selector = $("languageSelect");
        if (!selector) return;

        var savedLanguage = localStorage.getItem("tnf_language") || "en";
        selector.value = savedLanguage;
        document.body.dataset.language = savedLanguage;
        translatePage(savedLanguage);
        selector.addEventListener("change", function () {
            var language = selector.value === "uk" ? "uk" : "en";
            localStorage.setItem("tnf_language", language);
            window.location.reload();
        });

        var observer = new MutationObserver(function () {
            translatePage(document.body.dataset.language || "en");
        });
        observer.observe(document.body, { childList: true, subtree: true });
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
                if (window.location.pathname.endsWith("products.html")) {
                    var filterState = {
                        categories: Array.prototype.slice.call(document.querySelectorAll(".category-filter:checked")).map(function (input) { return input.value; }),
                        sizes: Array.prototype.slice.call(document.querySelectorAll(".size-filter:checked")).map(function (input) { return input.value; }),
                        rating: (document.querySelector("input[name='rating']:checked") || {}).value || "",
                        minPrice: ($("priceMin") || {}).value || "0",
                        maxPrice: ($("priceMax") || {}).value || "500",
                        sort: ($( "sortSelect") || {}).value || "featured"
                    };
                    try { sessionStorage.setItem("tnf_filter_state", JSON.stringify(filterState)); } catch (error) { }
                }
                var searchParams = window.location.pathname.endsWith("products.html") ? new URLSearchParams(window.location.search) : new URLSearchParams();
                searchParams.set("search", term);
                window.location.href = "products.html?" + searchParams.toString();
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

    function initFaqAccordion() {
        document.querySelectorAll(".faq-question").forEach(function (question) {
            question.setAttribute("role", "button");
            question.setAttribute("tabindex", "0");

            function toggleAnswer() {
                var item = question.closest(".faq-item");
                if (item) item.classList.toggle("active");
            }

            question.addEventListener("click", toggleAnswer);
            question.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleAnswer();
                }
            });
        });
    }

    function initFooterHighlights() {
        var footerLinks = document.querySelectorAll(".footer a[href]");
        if (!footerLinks.length) return;

        var storageKey = "tnf_footer_highlight";

        function getTargetText(linkUrl) {
            var target = null;

            if (linkUrl.hash) {
                target = document.getElementById(decodeURIComponent(linkUrl.hash.slice(1)));
            } else if (linkUrl.pathname === window.location.pathname) {
                target = document.querySelector("h1");
            }

            if (!target) return null;
            return target.matches("h1, h2, h3, p") ? target : target.querySelector("h1, h2, h3, p") || target;
        }

        function highlightTarget(linkUrl) {
            var targetText = getTargetText(linkUrl);
            if (!targetText) return;

            targetText.classList.remove("footer-target-highlight");
            void targetText.offsetWidth;
            targetText.classList.add("footer-target-highlight");
            window.setTimeout(function () {
                targetText.classList.remove("footer-target-highlight");
            }, 2000);
        }

        var pendingHighlight = null;
        try {
            pendingHighlight = JSON.parse(sessionStorage.getItem(storageKey) || "null");
            sessionStorage.removeItem(storageKey);
        } catch (error) {
            pendingHighlight = null;
        }

        footerLinks.forEach(function (link) {
            var linkUrl = new URL(link.href, window.location.href);

            if (pendingHighlight &&
                window.location.pathname === pendingHighlight.path &&
                window.location.hash === pendingHighlight.hash) {
                highlightTarget(linkUrl);
            }

            link.addEventListener("click", function () {
                if (linkUrl.pathname === window.location.pathname) {
                    highlightTarget(linkUrl);
                }
                try {
                    sessionStorage.setItem(storageKey, JSON.stringify({
                        path: linkUrl.pathname,
                        hash: linkUrl.hash
                    }));
                } catch (error) {
                    // Highlighting the current link still works when storage is unavailable.
                }
            });
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        initMobileMenu();
        initSearchBar();
        initUserModal();
        initSimpleForms();
        initFaqAccordion();
        initFooterHighlights();
        initLanguageSwitcher();
        updateCartBadge();
    });

    window.TNF = window.TNF || {};
    window.TNF.updateCartBadge = updateCartBadge;
    window.TNF.translatePage = translatePage;
    window.TNF.translateValue = translateValue;
})();
