
/*=============== MENU MOBILE ===============*/
const menuMobileBtn = document.querySelector('.menu-mobile-btn');
const menu = document.querySelector('.menu');

menuMobileBtn.addEventListener('click', showMobileMenu);

function showMobileMenu() {
  menu.classList.toggle('show_menu');
}


/*=============== TABS ===============*/
const tabs = document.querySelectorAll('.about__skills--tab');
const contents = document.querySelectorAll('.about__skills--tab-content');

tabs.forEach((tab, index) => {
   tab.addEventListener('click', () => {
      contents.forEach((content) => {
         content.classList.remove('visible');
      });

      tabs.forEach((t) => {
         t.classList.remove('active');
      });

      tabs[index].classList.add('active');
      contents[index].classList.add('visible');
   });
});


/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-fill'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-fill' : 'ri-sun-fill'

// We validate if the user previously chose a topic
if (selectedTheme) {
   // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
   document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
   themeButton.classList[selectedIcon === 'ri-moon-fill' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
   // Add or remove the dark / icon theme
   document.body.classList.toggle(darkTheme)
   themeButton.classList.toggle(iconTheme)
   // We save the theme and the current icon that the user chose
   localStorage.setItem('selected-theme', getCurrentTheme())
   localStorage.setItem('selected-icon', getCurrentIcon())
});


/*=============== SCROLL SMOOTH IN LINKS ===============*/
const allLinks = document.querySelectorAll('a[href^="#"]');

allLinks.forEach(link => {
   link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({
         behavior: 'smooth',
      });
   });
});

