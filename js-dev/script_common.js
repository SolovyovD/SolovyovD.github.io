const urlLocation = window.location.href;
const navLanguage = navigator.language;
// const navLanguage = 'pt';
const pageLang = document.documentElement.lang;
const isLanguageChosen = localStorage.getItem('isLanguageChosen');

const setLanguage = () => {
  localStorage.setItem('isLanguageChosen', true);
};

// Temporary redirect until these translations are done
if (urlLocation.includes('/ee/') || urlLocation.includes('/es/')) {
  window.location.replace('/');
}

if (
  !urlLocation.includes('/ee/') &&
  !urlLocation.includes('/es/') &&
  !urlLocation.includes('/pt/') &&
  !urlLocation.includes('/blog/')
) {
  if (!isLanguageChosen) {
    if (navLanguage.includes('et')) {
      // window.location.replace('/ee/');
    } else if (navLanguage.includes('es')) {
      // window.location.replace('/es/');
    } else if (navLanguage.includes('pt')) {
      setLanguage();
      window.location.replace('/pt/');
    } else {
      // window.location.replace('/en/');
    }
  }
}

if (urlLocation.includes('/blog/')) {
  $('nav').load('../helpers/navigation_blog.html');
  $('footer').load('../helpers/footer_blog.html');
} else if (pageLang == 'es') {
  $('nav').load('../helpers/navigation_es.html');
  $('footer').load('../helpers/footer_es.html');
} else if (pageLang == 'et') {
  $('nav').load('../helpers/navigation_ee.html');
  $('footer').load('../helpers/footer_ee.html');
} else if (pageLang == 'pt') {
  $('nav').load('../helpers/navigation_pt.html');
  $('footer').load('../helpers/footer_pt.html');
} else {
  $('nav').load('../helpers/navigation_en.html');
  $('footer').load('../helpers/footer_en.html');
}

const openModal = (clicked_id) => {
  const combine = clicked_id + '_modal';
  const modal = document.getElementById(combine);

  modal.style.display = 'flex';
  $(modal).children().addClass('quickZoom');
  $(modal).addClass('fadeIn');

  $('.modal__close').click(function () {
    modal.style.display = 'none';
    removeEventListener('click', handler, false);
  });

  const handler = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
      removeEventListener('click', handler, false);
    }
  };
  addEventListener('click', handler, false);
};

const toggleNavigation = () => {
  if ($(window).width() < 991) {
    const navlinks = document.getElementById('navigation__links');
    navlinks.classList.toggle('navigation__links__active');
  }
};

const closeNavigation = () => {
  const navlinks = document.getElementById('navigation__links');
  navlinks.classList.remove('navigation__links__active');
};

const selectRole = (clicked_id) => {
  const roles = ['role_leader', 'role_teacher', 'role_parent'];

  if (!clicked_id.match(/^(role_leader|role_teacher|role_parent)$/)) {
    selectRole('role_teacher');
    return;
  }

  roles.forEach((role) => {
    document.getElementById(role).classList.remove('button__role__selected');
  });
  document.getElementById(clicked_id).classList.add('button__role__selected');

  const sectionRoles = document.querySelectorAll('.section__role');

  const selectedRole = clicked_id.split('_')[1];

  // Display selected role section

  sectionRoles.forEach((section) => {
    if (section.id == selectedRole) {
      section.style.display = 'flex';
      section.classList.add('fadeIn');
    } else {
      section.style.display = 'none';
      section.classList.remove('fadeIn');
    }
  });

  // Change header bg color by selection, quite spaghetti but it is working

  const header = document.querySelector('header');

  if (selectedRole == 'leader') {
    header.classList.add('header__blue');
    header.classList.remove('header__green');
    header.classList.remove('header__pink');
  } else if (selectedRole == 'parent') {
    header.classList.add('header__pink');
    header.classList.remove('header__green');
    header.classList.remove('header__blue');
  } else {
    header.classList.add('header__green');
    header.classList.remove('header__blue');
    header.classList.remove('header__pink');
  }
};

if (urlLocation.includes('/get-started')) {
  const idTarget = urlLocation.split('#')[1];
  selectRole('role_' + (new URLSearchParams(window.location.search).get('role') || idTarget || 'teacher'));
}

const resizeFunctions = () => {
  closeNavigation();
  setCarouselHeight();
};

const onloadFunctions = () => {
  setCarouselHeight();
  startCarousel();
};

window.onresize = resizeFunctions;

window.onload = onloadFunctions;
