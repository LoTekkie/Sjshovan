<template>
<!--  <vue-particles v-bind="this.fxParticlesOptions" :key="this.fxParticlesOptions.key" class="w-full -z-10 absolute"></vue-particles>-->
  <div id="home" ref="wrap" :style="{'margin-top': this.isNavHeaderSticky ? `-${this.c_navHeight}px` : '0'}">
    <!--nav-->
    <div class="w-full z-50 top-0 py-3 sm:py-5 absolute" ref="nav" :class="{'sticky':this.isNavHeaderSticky}">
      <div v-if="this.isNavHeaderSticky">
        <matrix-effect v-bind="this.fxMatrixOptions" :theme="{wrap: ['-z-10']}"></matrix-effect>
        <div class="bg-center bg-cover bg-no-repeat absolute inset-0 bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to -z-10"></div>
      </div>
      <div class="container flex justify-between items-center">
        <div class=" flex truncate h-16 justify-center items-center flex-column nowrap">
          <a href="/">
            <span class="text-white text-4xl">
              <decode-effect v-bind="this.fxDecodeOptions" :loop="true" :loopDelay="5000" :direction="0">Sjshovan.com</decode-effect>
            </span>
          </a>
        </div>
        <div class="hidden lg:block">
          <ul class="flex items-center">
            <li v-for="item in this.navItems.slice(0, -1)" class="group pl-6">
              <span @click="this.scrollTo(item.href)" @mouseenter="item.hovered = true" @mouseleave="this.onNavItemMouseLeave"
                    class="font-header font-semibold text-white uppercase pt-0.5 cursor-pointer">
                <decode-effect v-if="item.hovered" v-bind="this.fxDecodeOptions" :direction="1" :startDelay="0" :scramble="false" :decodeDelay="100">{{ item.href }}</decode-effect>
                <span v-if="!item.hovered">{{ item.href }}</span>
                <span class="block w-full h-0.5 bg-transparent group-hover:bg-orange mt-1"></span>
              </span>
            </li>
            <li v-if="this.isNavHeaderSticky" v-for="item in this.navItems.slice(-1)"  class="group pl-6">
              <span @click="this.scrollTo(item.href)" @mouseenter="item.hovered = true" @mouseleave="this.onNavItemMouseLeave"
                    class="flex justify-center items-center bg-primary-lighter border-primary-lighter border-4  rounded-full items-center font-header font-semibold text-white uppercase cursor-pointer text-xl mb-2">
                <font-awesome-icon icon="arrow-circle-up" size="lg" class="absolute" />
                <font-awesome-icon icon="arrow-circle-up" size="lg" :class="{'animate-ping':item.hovered}" />
              </span>
            </li>
          </ul>
        </div>
        <div class="flex flex-row flex-nowrap lg:hidden">
          <button @click="this.mobileMenu = true">
            <span class="flex flex-row flex-nowrap justify-center items-center">
              <i class='bx bx-menu text-white text-4xl'></i>
            </span>
          </button>
           <span v-if="this.isNavHeaderSticky" v-for="item in this.navItems.slice(-1)"  class="group pl-2">
              <span @click="this.scrollTo(item.href)" @mouseenter="item.hovered = true" @mouseleave="this.onNavItemMouseLeave"
                    class="flex justify-center items-center bg-primary-lighter border-primary-lighter border-4  rounded-full items-center font-header font-semibold text-white uppercase cursor-pointer text-xl">
                <font-awesome-icon icon="arrow-circle-up" size="lg" class="absolute" />
                <font-awesome-icon icon="arrow-circle-up" size="lg" :class="{'animate-ping':item.hovered}" />
              </span>
            </span>
        </div>
      </div>
    </div>
    <!--mobile-->
    <div :class="{ 'opacity-100 pointer-events-auto': this.mobileMenu }"
         class="fixed inset-0 bg-black bg-opacity-70 z-50 min-h-screen lg:hidden transition-opacity opacity-0 pointer-events-none">
       <div class="bg-center bg-cover bg-no-repeat absolute inset-0 bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to "></div>
      <div class="w-2/3 md:w-1/3 bg-primary-darker min-h-screen absolute right-0 shadow py-4 px-8">
        <button @click="this.mobileMenu = false" class="absolute top-0 right-0 mt-4 mr-4">
          <img alt="" class="h-10 w-auto" src="/img/icon-close.svg">
        </button>
        <ul class="flex flex-col mt-12">
          <li v-for="item in this.navItems.slice(0, -1)" class="group py-2 cursor-pointer hover:text-2xl"  @click="() => { this.scrollTo(item.href); this.mobileMenu = false; }">
            <span class="font-header font-semibold text-white uppercase pt-0.5">{{ item.href }}</span>
            <span class="block h-0.5 bg-transparent group-hover:bg-orange mt-1"></span>
          </li>
        </ul>
      </div>
    </div>
    <!--/mobile-->
    <!--/nav-->
    <div>
      <div class="bg-center bg-cover bg-no-repeat relative py-8">
        <matrix-effect v-bind="this.fxMatrixOptions"></matrix-effect>
        <div class="bg-center bg-cover bg-no-repeat absolute inset-0 z-20 bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to"></div>
        <div class="container z-30 relative pt-20 sm:pt-56 lg:pt-64 pb-12 sm:pb-48 lg:pb-48">
          <div class="flex flex-col lg:flex-row justify-center items-center">
            <div class="rounded-full border-8 border-primary shadow-xl flex-shrink-0">
              <img alt="author" class="h-48 sm:h-56 rounded-full" src="/img/me.jpg">
            </div>
            <div class="lg:pl-8 pt-8 sm:pt-10 lg:pt-0">
              <h1 class="font-header text-white text-4xl sm:text-5xl md:text-6xl text-center truncate md:max-h-16">
                <decode-effect v-bind="this.fxDecodeOptions" :decodeDelay="50">Hi, I'm Sid Shovan!</decode-effect>
              </h1>
              <ul class="font-body text-white pt-6 list-disc ml-6 text-base">
                <li>Full-stack developer specializing in the Laravel framework.</li>
                <li>Proven leader who fosters collaborative and supportive team environments.</li>
                <li>Quickly learns new software and hardware technologies.</li>
                <li>Professional, skilled, and passionate.</li>
              </ul>
              <div class="flex flex-col sm:flex-row justify-center lg:justify-start pt-3 sm:pt-5">
                <div class="flex justify-center sm:justify-start items-center">
                  <p class="font-body text-white text-lg uppercase"></p>
                  <div class="hidden sm:block">
                    <i class='bx bx-chevron-right text-orange text-3xl -ml-1'></i>
                  </div>
                </div>
                <div class="flex items-center justify-center sm:justify-start pt-5 sm:pt-0 pl-2">
                  <a href="/">
                    <i class='bx bxl-facebook-square text-white hover:text-orange text-2xl'></i>
                  </a>
                  <a class="pl-4" href="/">
                    <i class='bx bxl-twitter text-white hover:text-orange text-2xl'></i>
                  </a>
                  <a class="pl-4" href="/">
                    <i class='bx bxl-linkedin text-white hover:text-orange text-2xl'></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-grey-50" id="skills">
        <div class="container py-16 md:py-20 flex flex-col lg:flex-row items-center">
          <div class="w-full sm:w-3/4 lg:w-3/5 text-center lg:text-left">
            <h2 class="font-header font-semibold text-primary text-4xl sm:text-5xl lg:text-6xl uppercase">
              Skills
            </h2>
            <p class="font-body text-grey-20 pt-6 leading-relaxed">

            </p>
            <div class="flex flex-col sm:flex-row justify-center lg:justify-start pt-6">
            </div>
          </div>
          <div class="w-full sm:w-3/4 lg:w-2/5 pl-0 lg:pl-12 pt-10 lg:pt-0">
          </div>
        </div>
      </div>
      <div class="container py-16 md:py-20" id="services">
        <h2 class="font-header font-semibold text-primary text-4xl sm:text-5xl lg:text-6xl uppercase text-center">
          Here's what I'm good at</h2>
        <h3 class="font-header font-medium text-black text-xl sm:text-2xl lg:text-3xl pt-6 text-center">
          These are the services Ioffer</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 pt-10 md:pt-12">
          <div class="shadow px-8 py-12 hover:bg-primary group rounded">
            <div class="text-center w-24 xl:w-28 h-24 xl:h-28 mx-auto">
              <div class="hidden group-hover:block">
                <img alt="development icon" src="/img/icon-development-white.svg">
              </div>
              <div class="block group-hover:hidden">
                <img alt="development icon" src="/img/icon-development-black.svg">
              </div>
            </div>
            <div class="text-center">
              <h3 class="font-semibold  text-lg lg:text-xl text-primary uppercase pt-8 group-hover:text-yellow">
                WEB DEVELOPMENT</h3>
              <p class="text-sm md:text-base text-grey pt-4 group-hover:text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
          <div class="shadow px-8 py-12 hover:bg-primary group rounded">
            <div class="text-center w-24 xl:w-28 h-24 xl:h-28 mx-auto">
              <div class="hidden group-hover:block">
                <img alt="content marketing icon" src="/img/icon-content-white.svg">
              </div>
              <div class="block group-hover:hidden">
                <img alt="content marketing icon" src="/img/icon-content-black.svg">
              </div>
            </div>
            <div class="text-center">
              <h3 class="font-semibold  text-lg lg:text-xl text-primary uppercase pt-8 group-hover:text-yellow">
                Technical Writing</h3>
              <p class="text-sm md:text-base text-grey pt-4 group-hover:text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
          <div class="shadow px-8 py-12 hover:bg-primary group rounded">
            <div class="text-center w-24 xl:w-28 h-24 xl:h-28 mx-auto">
              <div class="hidden group-hover:block">
                <img alt="Mobile Application icon" src="/img/icon-mobile-white.svg">
              </div>
              <div class="block group-hover:hidden">
                <img alt="Mobile Application icon" src="/img/icon-mobile-black.svg">
              </div>
            </div>
            <div class="text-center">
              <h3 class="font-semibold  text-lg lg:text-xl text-primary uppercase pt-8 group-hover:text-yellow">
                Mobile Development</h3>
              <p class="text-sm md:text-base text-grey pt-4 group-hover:text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
          <div class="shadow px-8 py-12 hover:bg-primary group rounded">
            <div class="text-center w-24 xl:w-28 h-24 xl:h-28 mx-auto">
              <div class="hidden group-hover:block">
                <img alt="Email Marketing icon" src="/img/icon-email-white.svg">
              </div>
              <div class="block group-hover:hidden">
                <img alt="Email Marketing icon" src="/img/icon-email-black.svg">
              </div>
            </div>
            <div class="text-center">
              <h3 class="font-semibold  text-lg lg:text-xl text-primary uppercase pt-8 group-hover:text-yellow">
                Email Development</h3>
              <p class="text-sm md:text-base text-grey pt-4 group-hover:text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
          <div class="shadow px-8 py-12 hover:bg-primary group rounded">
            <div class="text-center w-24 xl:w-28 h-24 xl:h-28 mx-auto">
              <div class="hidden group-hover:block">
                <img alt="Theme Design icon"
                     src="/img/icon-design-white.svg">
              </div>
              <div class="block group-hover:hidden">
                <img alt="Theme Design icon"
                     src="/img/icon-design-black.svg">
              </div>
            </div>
            <div class="text-center">
              <h3 class="font-semibold  text-lg lg:text-xl text-primary uppercase pt-8 group-hover:text-yellow">
                Graphic Design</h3>
              <p class="text-sm md:text-base text-grey pt-4 group-hover:text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
          <div class="shadow px-8 py-12 hover:bg-primary group rounded">
            <div class="text-center w-24 xl:w-28 h-24 xl:h-28 mx-auto">
              <div class="hidden group-hover:block">
                <img alt="Graphic Design icon" src="/img/icon-graphics-white.svg">
              </div>
              <div class="block group-hover:hidden">
                <img alt="Graphic Design icon" src="/img/icon-graphics-black.svg">
              </div>
            </div>
            <div class="text-center">
              <h3 class="font-semibold  text-lg lg:text-xl text-primary uppercase pt-8 group-hover:text-yellow">
                Web Design</h3>
              <p class="text-sm md:text-base text-grey pt-4 group-hover:text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container py-16 md:py-20" id="portfolio">
        <h2 class="font-header font-semibold text-primary text-4xl sm:text-5xl lg:text-6xl uppercase text-center">
          Check out my Portfolio</h2>
        <h3 class="font-header font-medium text-black text-xl sm:text-2xl lg:text-3xl pt-6 text-center">
          Here's what I have done with the past</h3>
        <div class="w-full sm:w-3/4 lg:w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 pt-12">
          <a class="mx-auto md:mx-0 transition-all transform hover:scale-105" href="/">
            <img alt="portfolio image" class="shadow w-full" src="/img/portfolio-apple.jpeg">
          </a>
          <a class="mx-auto md:mx-0 transition-all transform hover:scale-105" href="/">
            <img alt="portfolio image" class="shadow w-full" src="/img/portfolio-stripe.jpeg">
          </a>
          <a class="mx-auto md:mx-0 transition-all transform hover:scale-105" href="/">
            <img alt="portfolio image" class="shadow w-full" src="/img/portfolio-fedex.jpeg">
          </a>
          <a class="mx-auto md:mx-0 transition-all transform hover:scale-105" href="/">
            <img alt="portfolio image" class="shadow w-full" src="/img/portfolio-microsoft.jpeg">
          </a>
        </div>
      </div>
      <div class="bg-grey-50" id="clients">
        <div class="container py-16 md:py-20">
          <div class="w-full sm:w-3/4 lg:w-full mx-auto">
            <h2 class="font-header font-semibold text-primary text-4xl sm:text-5xl lg:text-6xl uppercase text-center">
              My latest clients</h2>
            <div class="flex flex-wrap items-center justify-center pt-4 sm:pt-4">
              <span class="block m-8">
                <img alt="client logo" class="mx-auto block h-12 w-auto" src="/img/logo-coca-cola.svg"/>
              </span>
              <span class="block m-8">
                <img alt="client logo" class="mx-auto block h-12 w-auto" src="/img/logo-apple.svg"/>
              </span>
              <span class="block m-8">
                <img alt="client logo" class="mx-auto block h-12 w-auto" src="/img/logo-netflix.svg"/>
              </span>
              <span class="block m-8">
                <img alt="client logo" class="mx-auto block h-12 w-auto" src="/img/logo-amazon.svg"/>
              </span>
              <span class="block m-8">
                <img alt="client logo" class="mx-auto block h-12 w-auto" src="/img/logo-stripe.svg"/>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="container py-16 md:py-20" id="work">
        <h2 class="font-header font-semibold text-primary text-4xl sm:text-5xl lg:text-6xl uppercase text-center">
          My work experience
        </h2>
        <h3 class="font-header font-medium text-black text-xl sm:text-2xl lg:text-3xl pt-6 text-center">
          Here's what I did before freelancing
        </h3>

        <div class="w-full lg:w-2/3 mx-auto flex flex-col mt-12 relative">
          <span class="absolute inset-y-0 left-2/5 ml-10 w-0.5 bg-grey-40 hidden md:block"></span>

          <div class="flex flex-col md:flex-row text-center md:text-left mt-8">
            <div class="md:w-2/5">
              <div class="flex justify-center md:justify-start">
                <span class="flex-shrink-0">
                    <img alt="company logo" class="w-32 h-auto" src="/img/logo-spotify.svg"/>
                </span>
                <div class="relative w-full ml-3 hidden md:block">
                  <span class="h-0.5 bg-grey-70 absolute inset-x-0 top-1/2 transform -translate-y-1/2"></span>
                </div>
              </div>
            </div>
            <div class="md:w-3/5">
              <div class="flex md:pl-18 relative">
                <span class="border-2 border-grey-40 rounded-full w-4 h-4 absolute left-8 top-1 bg-white hidden md:block"></span>
                <div class="mt-1 flex">
                  <i class='bx bxs-right-arrow text-primary hidden md:block'></i>
                  <div class="md:pl-8 md:-mt-1">
                    <span class="font-body font-bold text-grey-40 block">Apr2015 - Mar 2018</span>
                    <span class="font-header font-bold text-xl text-primary uppercase block pt-2">Frontend Developer</span>
                    <div class="pt-2">
                      <span class="font-body text-black block">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Vestibulum mattis felis vitae risus pulvinar
                          tincidunt. Nam ac venenatis enim.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row text-center md:text-left mt-8">
            <div class="md:w-2/5">
              <div class="flex justify-center md:justify-start">
                <span class="flex-shrink-0">
                    <img alt="company logo" class="w-32 h-auto" src="/img/logo-microsoft.svg"/>
                </span>
                <div class="relative w-full ml-3 hidden md:block">
                  <span class="h-0.5 bg-grey-70 absolute inset-x-0 top-1/2 transform -translate-y-1/2"></span>
                </div>
              </div>
            </div>
            <div class="md:w-3/5">
              <div class="flex md:pl-18 relative">
                <span class="border-2 border-grey-40 rounded-full w-4 h-4 absolute left-8 top-1 bg-white hidden md:block"></span>
                <div class="mt-1 flex">
                  <i class='bx bxs-right-arrow text-primary hidden md:block'></i>
                  <div class="md:pl-8 md:-mt-1">
                    <span class="font-body font-bold text-grey-40 block">Mar 2018 - September 2019</span>
                    <span class="font-header font-bold text-xl text-primary uppercase block pt-2">Software Engineer</span>
                    <div class="pt-2">
                      <span class="font-body text-black block">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          Vestibulum mattis felis vitae risus pulvinar
                          tincidunt. Nam ac venenatis enim.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row text-center md:text-left mt-8">
            <div class="md:w-2/5">
              <div class="flex justify-center md:justify-start">
                <span class="flex-shrink-0">
                    <img alt="company logo" class="w-32 h-auto" src="/img/logo-fedex.svg"/>
                </span>
                <div class="relative w-full ml-3 hidden md:block">
                  <span class="h-0.5 bg-grey-70 absolute inset-x-0 top-1/2 transform -translate-y-1/2"></span>
                </div>
              </div>
            </div>
            <div class="md:w-3/5">
              <div class="flex md:pl-18 relative">
                <span class="border-2 border-grey-40 rounded-full w-4 h-4 absolute left-8 top-1 bg-white hidden md:block"></span>
                <div class="mt-1 flex">
                  <i class='bx bxs-right-arrow text-primary hidden md:block'></i>
                  <div class="md:pl-8 md:-mt-1">
                    <span class="font-body font-bold text-grey-40 block">October 2019 - Feb 2021</span>
                    <span class="font-header font-bold text-xl text-primary uppercase block pt-2">DevOps Engineer</span>
                    <div class="pt-2">
                      <span class="font-body text-black block">Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit.Vestibulum mattis felis vitae
                          risus pulvinartincidunt. Nam ac venenatis enim.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-top bg-cover bg-no-repeat pb-16 md:py-16 lg:py-24"
           id="statistics" style="background-image:url(/img/experience-figure.png)">
        <div class="container">
          <div class="bg-white w-5/6 md:w-11/12 2xl:w-full mx-auto py-16 lg:py-20 xl:py-24 shadow">
            <div class="grid grid-cols-2 xl:grid-cols-4 gap-5 md:gap-8 xl:gap-5">
              <div class="flex md:flex-row flex-col justify-center items-center text-center md:text-left">
                <div>
                  <img alt="icon project" class="mx-auto h-12 md:h-20 w-auto"
                       src="/img/icon-project.svg">
                </div>
                <div class="md:pl-5 md:pt-0 pt-5">
                  <h1 class="font-body font-bold md:text-4xl text-2xl text-primary">12</h1>
                  <h4 class="font-header font-medium md:text-xl text-base text-grey-dark leading-loose">
                    Finished Projects
                  </h4>
                </div>
              </div>

              <div class="flex md:flex-row flex-col justify-center items-center text-center md:text-left">
                <div>
                  <img alt="icon award" class="mx-auto h-12 md:h-20 w-auto" src="/img/icon-award.svg">
                </div>
                <div class="md:pl-5 md:pt-0 pt-5">
                  <h1 class="font-body font-bold md:text-4xl text-2xl text-primary">3</h1>
                  <h4 class="font-header font-medium md:text-xl text-base text-grey-dark leading-loose">
                    Awards Won
                  </h4>
                </div>
              </div>

              <div
                  class="flex md:flex-row flex-col justify-center items-center text-center md:text-left lg:mt-0 md:mt-10 mt-6">
                <div>
                  <img alt="icon happy clients" class="mx-auto h-12 md:h-20 w-auto"
                       src="/img/icon-happy.svg">
                </div>
                <div class="md:pl-5 md:pt-0 pt-5">
                  <h1 class="font-body font-bold md:text-4xl text-2xl text-primary">8</h1>
                  <h4 class="font-header font-medium md:text-xl text-base text-grey-dark leading-loose">
                    Happy Clients
                  </h4>
                </div>
              </div>

              <div
                  class="flex md:flex-row flex-col justify-center items-center text-center md:text-left lg:mt-0 md:mt-10 mt-6">
                <div>
                  <img alt="icon puzzle" class="mx-auto h-12 md:h-20 w-auto"
                       src="/img/icon-puzzle.svg">
                </div>
                <div class="md:pl-5 md:pt-0 pt-5">
                  <h1 class="font-body font-bold md:text-4xl text-2xl text-primary">99</h1>
                  <h4 class="font-header font-medium md:text-xl text-base text-grey-dark leading-loose">
                    Bugs Fixed
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-grey-50" id="blog">
        <div class="container py-16 md:py-20">
          <h2 class="font-header font-semibold text-primary text-4xl sm:text-5xl lg:text-6xl uppercase text-center">
            I also like to write</h2>
          <h4 class="font-header font-medium text-black text-xl sm:text-2xl lg:text-3xl pt-6 text-center">
            Check out my latest posts!
          </h4>
          <div class="w-full sm:w-3/4 lg:w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-10 pt-12">
            <a class="shadow" href="/post">
              <div class="bg-center bg-cover bg-no-repeat h-72 sm:h-84 lg:h-64 xl:h-72 relative group"
                   style="background-image:url(/img/post-01.png);">
                <span class="bg-cover bg-no-repeat bg-center absolute inset-0 opacity-10 transition-opacity
                             group-hover:opacity-50 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to"></span>
                <span class="font-body font-bold text-sm md:text-base text-white border-2 border-white block px-6 py-2
                             uppercase rounded-full text-center absolute right-0 bottom-0 mr-4 mb-4">
                  Read More</span>
              </div>
              <div class="bg-white py-6 xl:py-8 px-5">
                <span class="font-body font-semibold text-lg text-black block">How to become a frontend developer</span>
                <span class="font-body text-grey-20 pt-2 block">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="container py-16 md:py-20" id="contact">
        <h2 class="font-header font-semibold text-primary text-4xl sm:text-5xl lg:text-6xl uppercase text-center">
          Here's a contact form
        </h2>
        <h4 class="font-header font-medium text-black text-xl sm:text-2xl lg:text-3xl pt-6 text-center">
          Have Any Questions?
        </h4>
        <div class="w-full sm:w-2/3 mx-auto pt-5 lg:pt-6 text-center">
          <p class="font-body text-grey-10">Lorem ipsum dolor sit amet consectetur adipiscing elit hendrerit
            condimentum
            turpis nisl sem, viverra habitasse urna ante lobortis fermentum accumsan.
            Viverra habitasse urna ante lobortis fermentum accumsan.</p>
        </div>
        <form class="w-full sm:w-3/4 mx-auto pt-10">
          <div class="flex flex-col md:flex-row">
            <input
                class="w-full md:w-1/2 mr-3 lg:mr-5 font-body text-black px-4 py-3 border-grey-50 rounded"
                id="name"
                placeholder="Name"
                type="text"/>
            <input
                class="w-full md:w-1/2 mt-6 md:mt-0 md:ml-3 lg:ml-5 font-body text-black px-4 py-3 border-grey-50 rounded"
                id="email"
                placeholder="Email"
                type="text">
          </div>
          <textarea class="w-full font-body text-black px-4 py-3 border-grey-50 rounded mt-6 md:mt-8"
                    cols="30"
                    id="message"
                    placeholder="Message"
                    rows="10">
                        </textarea>
          <button
              class="bg-primary hover:bg-grey-20 font-header font-bold text-lg text-white px-8 py-3 flex justify-center mt-6 rounded items-center uppercase">
            Send
            <i class='bx bx-chevron-right text-3xl relative -right-2'></i>
          </button>
        </form>
        <div class="flex flex-col lg:flex-row pt-16">
          <div
              class="w-full lg:w-1/3 border-l-2 border-t-2 border-r-2 border-b-2 border-grey-60 px-6 py-6 sm:py-8">
            <div class="flex items-center">
              <i class='bx bx-phone text-grey-40 text-2xl'></i>
              <p class="font-body font-bold text-grey-40 lg:text-lg uppercase pl-2">My Phone</p>
            </div>
            <p class="font-body font-bold text-primary lg:text-lg pt-2 text-left">(+881) 111 222 333</p>
          </div>
          <div
              class="w-full lg:w-1/3 border-l-2 lg:border-l-0 border-t-0 lg:border-t-2 border-r-2 border-b-2 border-grey-60 px-6 py-6 sm:py-8">
            <div class="flex items-center">
              <i class='bx bx-envelope text-grey-40 text-2xl'></i>
              <p
                  class="font-body font-bold text-grey-40 lg:text-lg uppercase pl-2">
                My Email</p>
            </div>
            <p
                class="font-body font-bold text-primary lg:text-lg pt-2 text-left">
              name@mydomain.com</p>
          </div>
          <div
              class="w-full lg:w-1/3 border-l-2 lg:border-l-0 border-t-0 lg:border-t-2 border-r-2 border-b-2 border-grey-60 px-6 py-6 sm:py-8">
            <div class="flex items-center">
              <i class='bx bx-map text-grey-40 text-2xl'></i>
              <p
                  class="font-body font-bold text-grey-40 lg:text-lg uppercase pl-2">
                My Address</p>
            </div>
            <p
                class="font-body font-bold text-primary lg:text-lg pt-2 text-left">
              123 New York D Block 1100, 2011 USA</p>
          </div>
        </div>
      </div>
      <div class="bg-center bg-cover bg-no-repeat h-72 sm:h-64 md:h-72 lg:h-96"
           style="background-image: url(/img/map.png);"></div>
      <div class="bg-center bg-cover bg-no-repeat relative py-16 lg:py-24 bg-primary bg-blend-multiply"
           style="background-image: url(/img/bg-cta.jpg);">
        <div class="container z-30 relative">
          <h3 class="font-header text-white text-3xl sm:text-4xl lg:text-5xl uppercase leading-tight text-center tracking-wide">
            Keep
            <span class="font-bold">up-to-date</span>
            <br/>
            with what I'm up to</h3>
          <form class="flex flex-col sm:flex-row justify-center mt-6">
            <input class="w-full sm:w-2/5 lg:w-1/3 font-body text-black px-4 py-3 sm:py-4 rounded"
               id="email"
               placeholder="Give me your Email"
               type="text">
            <button class="font-body font-bold px-8 py-3 sm:py-4 bg-yellow hover:bg-primary text-base md:text-lg
                           text-primary hover:text-white uppercase rounded sm:ml-2 mt-2 sm:mt-0 transition-colors
                           focus:ring focus:ring-yellow focus:border-transparent focus:outline-none">
              Join the club</button>
          </form>
        </div>
      </div>
    </div>
    <div class="bg-primary">
      <div class="container py-6 flex flex-col sm:flex-row justify-between">
        <p class="font-body text-white text-center md:text-left">© Copyright
          2021. All right reserved, ATOM.</p>
        <div class="flex items-center justify-center sm:justify-start pt-5 sm:pt-0">
          <a href="/">
            <i class='bx bxl-facebook-square text-white hover:text-yellow text-2xl'></i>
          </a>
          <a class="pl-4" href="/">
            <i class='bx bxl-twitter text-white hover:text-yellow text-2xl'></i>
          </a>
          <a class="pl-4" href="/">
            <i class='bx bxl-dribbble text-white hover:text-yellow text-2xl'></i>
          </a>
          <a class="pl-4" href="/">
            <i class='bx bxl-linkedin text-white hover:text-yellow text-2xl'></i>
          </a>
          <a class="pl-4" href="/">
            <i class='bx bxl-instagram text-white hover:text-yellow text-2xl'></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import PageLayout from "@/Layouts/PageLayout";
  import DecodeEffect from "@/Components/DecodeEffect";
  import MatrixEffect from "@/Components/MatrixEffect";

  let stickyOffset = 0;

  export default defineComponent({
    layout: null,

    components: {
      PageLayout,
      DecodeEffect,
      MatrixEffect
    },

    data() {
      return {
        mobileMenu: false,
        isNavHeaderSticky: false,
        fxDecodeOptions: {
          enabled: true,
          direction: 0,
          scramble: true,
          startDelay: 500,
          scrambleDelay: 100,
          decodeDelay: 100,
          decodeSync: false,
          decodeChars: "10",
          theme: {
            chars: {
              encoded: ["font-body", "text-primary-lightest"]
            }
          }
        },
        fxMatrixOptions: {
          enabled: true,
          delay: 50,
          font: "15pt sans-serif",
          availChars: "10",
          getCharStyle() {
            return "#003F7D"
          }
        },
        fxParticlesOptions: {
           particleOpacity: 0.7,
            particlesNumber: 10,
            particleSize: 4,
            linesWidth: 1,
            lineLinked: true,
            lineOpacity: 0.4,
            linesDistance: 150,
            moveSpeed: 3,
            hoverEffect: false,
            clickEffect: false,
            color: '#003F7D',
            linesColor: '#494949',
            shapeType: 'triangle',
            hoverMode: 'grab',
            clickMode: 'repulse',
            key: 0
        },
        navItems: [
          { href: "skills", hovered: false },
          { href: "services", hovered: false },
          { href: "portfolio", hovered: false },
          { href: "work", hovered: false },
          { href: "blog", hovered: false },
          { href: "contact", hovered: false },
          { href: "home", hovered: false }
        ],
        skills: [
          "HTML", "CSS", "SASS", "LESS", "Javascript", "JQuery", "Typescript", "Vue.js", "Inertia.js", "PHP", "Laravel",
          "WordPress", "Python", "Django", "C#", "MySQL", "TailwindCSS", "Bootstrap", "Foundation"
        ]
      }
    },

    computed: {
      c_navHeight() { return this.$refs.nav.clientHeight; }
    },

    methods: {
      scrollTo(id) {
        let $el = document.getElementById(`${id}`);
        let offset = $el.id == this.navItems.slice(-1)[0].href ? 0 : 100;
        window.scroll({
          top: $el.offsetTop - offset,
          left: 0,
          behavior: 'smooth'
        })
      },

      clearNavItemsHovered() {
         this.navItems.forEach(function (item) {
            item.hovered = false;
          });
      },

      onNavItemMouseLeave(e) {
        setTimeout(this.clearNavItemsHovered, 10);
      },

      handleScroll(e) {
        this.isNavHeaderSticky = window.pageYOffset > stickyOffset;
      }
    },

    mounted() {
      stickyOffset = this.$refs.nav.offsetTop;
      window.addEventListener('scroll', this.handleScroll);
    },

    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  })
</script>
