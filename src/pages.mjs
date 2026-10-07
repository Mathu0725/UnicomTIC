import { site, layout, pageHero, sectionHead, cardGrid, button, icon, esc } from "./site.mjs";

const reasons = [
  { title: "Industry-Ready Skill Development", text: "At Unicom TIC, being industry-ready means mastering the practical skills and knowledge that employers demand. Our experienced instructors focus on hands-on training, bridging the gap between theory and real-world application. This ensures you’re prepared to face industry challenges and succeed in your career from day one." },
  { title: "Tech-Ready in Months, Not Years", text: "Within 12 Months, you’ll be equipped with the skills and knowledge necessary to thrive in the tech industry. Our intensive curriculum ensures you are well-prepared for a successful career in tech." },
  { title: "100% Scholarship: Full Program Funding", text: "We have already secured 100% of the funding for your program from our generous supporters. Your learning journey is our investment." },
  { title: "Assured Careers: From Classroom to Workplace", text: "We’ve established strong partnerships with tech companies who will prioritise job placements for all successful candidates." }
];

const stages = [
  ["REGISTRATION", "Please fill out the form to register your interest in our program."],
  ["APPLICATION", "All registrants will receive an application form. Applications will evaluate the logical thinking capacity and passion for technology of the applicants."],
  ["WORKSHOPS", "All registrants will receive an application form. Applications will evaluate the logical thinking capacity and passion for technology of the applicants."],
  ["INTERVIEWS", "Selected candidates will be invited for interviews. These interviews aim to identify the most suitable candidates for the course. All successful candidates will be eligible for a 100% scholarship."],
  ["TRAINING PROGRAMME", "Successful candidates can join our 9 months full-time course at our campus in Jaffna."],
  ["Funded Internationally Recognised Qualification", "Industry Ready candidates prepared for – Azure Developer Associate Certification (AZ204). Exam fees funded for eligible candidates."]
];

const team = [
  { name: "Shantha Ruban", role: "Co Founder & Executive Director", image: "/assets/images/team-shantha.png", text: "W. ShanthaRuban, a visionary and an eminent figure acclaimed among the World’s 100 Global Tech Innovators stands as a visionary serial tech entrepreneur and the Founder of 5 tech companies in the UK. He is currently serving as the Group CEO of Programus Limited UK, developing world-class solutions for some of the worlds leading conglomerates, while also shaping the digital landscape with cutting-edge technology." },
  { name: "Dr. Neil Anthony-Pillai", role: "Co Founder & Chief Training and Innovation Director", image: "/assets/images/team-neil.png", text: "Dr. Neil Anthony-Pillai’s IT career started at NIBM in 1981 and has spanned over 40 years. He has worked for multiple blue-chip companies and Médecins Sans Frontières on projects across the world. Having always had a passion for training he has designed and delivered training in both Information Technology and Medicine." },
  { name: "Jon Guffaston", role: "Chief Technology Officer", image: "/assets/images/team-jon.png", text: "Renowned as one of the world’s foremost technicians, Jon brings a wealth of technical expertise to Unicom TIC. His primary focus is on preparing every student for the demands of the industry, guaranteeing that certificates are endorsed directly from the CTO’s office in the UK." },
  { name: "Prof. Dhayalan Velauthapillai", role: "Advisor", image: "/assets/images/team-dhayalan.png", text: "Professor Dhayalan Velauthapillai is attached to the Faculty of Engineering and Science, Western Norway University of Applied Sciences (HVL), Norway. He heads the international research group on Advanced Nanomaterials for Clean Energy and Health Applications (ANCEHA)." },
  { name: "S. Renganathan", role: "Advisor", image: "/assets/images/team-renganathan.png", text: "With an illustrious banking career spanning over four decades, Sivakrishnarajah Renganathan has emerged as a luminary in the industry. Notably, he served as the Managing Director / Chief Executive Officer of the globally recognized Commercial Bank of Ceylon PLC." },
  { name: "Mayooran Somasundaram", role: "Technologist & Head of programs", image: "/assets/images/team-mayooran.png", text: "As our Technologist and Senior Tech Lead, Mayooran is instrumental in imparting practical knowledge and industry best practices to our students. His extensive experience and hands-on approach contribute significantly to the development of well-rounded tech professionals." },
  { name: "Duwarahan Balakrishnan", role: "Operations Manager", image: "/assets/images/team-duwarahan.png", text: "Duwarahan Balakrishnan takes charge of the day-to-day operations at Unicom TIC, ensuring seamless functioning and a conducive learning environment for our students." },
  { name: "Anushyanthan Selvanayagam", role: "Strategic Director", image: "/assets/images/team-anushyanthan.png", text: "Anushan assumes a pivotal role as the Facilitator. His wealth of experience and expertise adds significant value to the team, contributing directly to the success of our programs." }
];

const teamCards = (members = team) => `<div class="people-grid">${members.map(member => `
  <article class="person-card">
    <div class="person-card__media"><img src="${member.image}" alt="${esc(member.name)}" loading="lazy" width="600" height="600"></div>
    <div><p class="eyebrow">${esc(member.role)}</p><h3>${esc(member.name)}</h3><p>${esc(member.text)}</p></div>
  </article>`).join("")}</div>`;

const home = () => layout({
  path: "/",
  title: "Unicom TIC - Skills Today, Success Tomorrow",
  description: "Unicom TIC provides fully funded, industry-ready technology training in Jaffna, Sri Lanka.",
  image: "/assets/images/home-hero.jpg",
  body: `
    <section class="home-hero" data-hero-carousel>
      <div class="hero-slides" aria-hidden="true">
        <div class="hero-slide is-active" style="--hero-image:url('/assets/images/home-hero.jpg')"></div>
        <div class="hero-slide" style="--hero-image:url('/assets/images/home-hero-original-02.jpeg?v=20261005-2')"></div>
        <div class="hero-slide" style="--hero-image:url('/assets/images/home-hero-original-03.jpg?v=20261005-2')"></div>
        <div class="hero-slide" style="--hero-image:url('/assets/images/home-hero-original-04.jpg?v=20261005-2')"></div>
      </div>
      <div class="container home-hero__content">
        <p class="eyebrow eyebrow--light">Welcome to Unicom TIC</p>
        <h1>Where we believe in Skills Today, Success Tomorrow</h1>
        <p>Unicom TIC is more than just a Training and Innovation Center; it’s your gateway to a future filled with technological opportunities. Our mission is to provide top-tier training and innovation that is accessible to all. We are proud to offer fully funded programs, with 100% of the funding secured from the UK, ensuring you have everything you need to succeed.</p>
        <div class="button-row">${button("Register Now", site.applyUrl, "light", 'target="_blank" rel="noopener"')}${button("Explore Programs", "/programs/", "outline-light")}</div>
      </div>
      <div class="hero-controls">
        <button type="button" aria-label="Previous image" data-hero-prev>${icon("arrow")}</button>
        <div class="hero-dots" aria-label="Choose hero image">
          <button class="is-active" type="button" aria-label="Show image 1" data-hero-dot="0"></button>
          <button type="button" aria-label="Show image 2" data-hero-dot="1"></button>
          <button type="button" aria-label="Show image 3" data-hero-dot="2"></button>
          <button type="button" aria-label="Show image 4" data-hero-dot="3"></button>
        </div>
        <button type="button" aria-label="Next image" data-hero-next>${icon("arrow")}</button>
      </div>
    </section>
    <section class="section section--soft"><div class="container">${sectionHead("Why Unicom TIC", "Here are four compelling reasons why Unicom TIC should be your choice")}${cardGrid(reasons)}</div></section>
    <section class="section program-structure"><div class="container">${sectionHead("The journey", "Program Structure", "A transparent route from registration to an internationally recognised qualification.")}
      <ol class="timeline">${stages.map(([title, text], i) => `<li><span>STAGE ${String(i + 1).padStart(2, "0")}</span><div><h3>${esc(title)}</h3><p>${esc(text)}</p>${i > 3 ? '<small>(STARTING MARCH 2024)</small>' : ""}</div></li>`).join("")}</ol>
      <div class="section-actions">${button("View Programs", "/programs/", "secondary")}</div>
    </div></section>
    <section class="section" id="team"><div class="container split-feature"><div>${sectionHead("People", "Meet the Team", "Our founding Directors, proud children of Sri Lanka, boast a collective experience of over 80 years in the global IT industry.")}${button("Meet the Team", "/meet-the-team/", "secondary")}</div><div class="team-preview">${team.slice(0,4).map(m => `<a href="/meet-the-team/"><img src="${m.image}" alt="${esc(m.name)}" loading="lazy"><span>${esc(m.name)}<small>${esc(m.role)}</small></span></a>`).join("")}</div></div></section>
    <section class="section story-band"><div class="container story-band__grid"><img src="/assets/images/story-home.png?v=20261005-1" alt="Unicom TIC learning environment in Jaffna" loading="lazy" width="943" height="460"><div>${sectionHead("Origins", "Our Story")}<p>One auspicious day, Shantha arrived at one of the group companies well before the usual bustle of the office. To his surprise, a group of young employees had already taken charge of the boardroom early that morning. Intrigued, Shantha decided to quietly observe.</p><p>Later, Shantha engaged with his childhood friend Dr. Neil Anthony-Pillai in a discussion about this transformative incident. Together, they unearthed a grander vision for Sri Lanka.</p>${button("Read Our Story", "/our-story/", "secondary")}</div></div></section>
    <section class="section section--soft program-overview" id="program-overview"><div class="container program-overview__grid"><div class="program-overview__video"><iframe src="https://www.youtube-nocookie.com/embed/YBK1lb66NNg?rel=0" title="Unicom TIC program overview video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="program-overview__copy"><p class="eyebrow">Program Overview</p><h2>"UNICOMTIC: The Nine-Month Path to Becoming a Software Engineer"</h2><p>A 100% free, non-profit initiative bridging the gap between expensive education and industry readiness.</p>${button("Visit Alumni", "/alumini/", "primary")}</div></div></section>`
});

const programs = [
  { title: "Foundations of Front-End Development", kicker: "Launch your web development adventure!", description: "Discover the web essentials: HTML, CSS, Javascript and unlock your potential to Learn and create websites from scratch.", level: "Workshop", duration: "1 Month (30 Hours)", image: "/assets/images/program-frontend.png", items: ["What is website development","What is HTML, CSS, Javascript","Introduction on Web Server","Type of Web Development","Website Development Process"] },
  { title: "Full-Stack Web Development Fundamentals", kicker: "Elevate your skills with expert guidance", description: "Comprehensive overview of computer basics and dive into web development with JavaScript, Introduction to Angular Framework, Version Control Systems, Database Management, and Deployment strategies.", level: "Certificate", duration: "2 Months (250 Hours)", image: "/assets/images/program-fullstack.png", items: ["Introduction to Computers","How does Web Works","Introduction to JavaScript","All About Variables Data Types","Type Casting","Data Structures","Loops & Iterations","Control Flow","Expressions and Operators","Functions and designing website","Introduction to GIT","Introduction to Package Managers","Introduction to Node","Introduction to Relational Database","Introduction to NO SQL database","Introduction to Web Servers"] },
  { title: "Mastering Angular and .NET Frameworks", kicker: "Harness advanced tech prowess in Angular and .NET", description: "Embark and ignite on a tech journey with a comprehensive study into GIT, Angular, TypeScript, .NET, SQL, and Azure Cloud. Gain expertise and project experience in version control, advanced app building, advanced database management, and cloud technologies.", level: "Diploma", duration: "7 Months (650 Hours)", image: "/assets/images/program-angular.png", items: ["Git & Github","GIT Commands","Maintain git repositories with multiple branches","Building Blocks of Angular App","Components","Templates","Directives","Services","Typescript Basic","Displaying Data & Event Handing","Components Interactions","Angular Forms","Routing & Navigation","Authentication and Authorization","Object Oriented Programming","Http & Web Sockets","Caching","API Standards",".Net Framework","Entity Framework","Architectural Patterns","Design and Development Principle","Basic SQL Syntax","Stored Procedures & Tiggers","Indexing","Basic Introduction to Azure Cloud Platform"] }
];

const programsPage = () => layout({
  path: "/programs/", title: "Programs - Unicom TIC", description: "Explore Unicom TIC workshop, certificate, and diploma software development programs.", image: "/assets/images/programs-hero.png",
  body: `${pageHero({title:"Explore Our Programs", intro:"Industry-aligned technology training from foundations to advanced application development.", image:"/assets/images/programs-hero.png"})}
    <section class="section"><div class="container">${sectionHead("Curriculum", "Three connected stages", "Each program builds practical capability through a focused, progressive learning path.")}
      <div class="program-list">${programs.map((p, i) => `<article class="program-card"><div class="program-card__media"><img src="${p.image}" alt="${esc(p.title)}" loading="lazy"></div><div class="program-card__body"><p class="eyebrow">Course ${String(i+1).padStart(2,"0")}</p><h2>${esc(p.title)}</h2><p class="program-kicker">${esc(p.kicker)}</p><p>${esc(p.description)}</p><dl><div><dt>Level</dt><dd>${esc(p.level)}</dd></div><div><dt>Duration</dt><dd>${esc(p.duration)}</dd></div></dl><details><summary>View Curriculum ${icon("plus")}</summary><ul>${p.items.map(x => `<li>${esc(x)}</li>`).join("")}</ul></details></div></article>`).join("")}</div>
      <aside class="eligibility"><div><p class="eyebrow">Eligibility</p><h2>Eligibility</h2></div><p>17 Years of Age or Older.</p><p>Passion and Logical Thinking Skills required.</p><small>*Terms and conditions apply.</small>${button("Register Now", site.applyUrl, "primary", 'target="_blank" rel="noopener"')}</aside>
    </div></section>`
});

const ourStory = () => layout({
  path: "/our-story/", title: "Our Story - Unicom TIC", description: "Read how Unicom TIC was conceived to build industry-ready digital innovators in Sri Lanka.", image: "/assets/images/story-jaffna.png",
  body: `${pageHero({title:"Our Story", intro:"The conception of an idea built around Sri Lankan talent and global technology experience.", image:"/assets/images/story-jaffna.png"})}
  <article class="section longform"><div class="container longform__grid"><aside><p class="eyebrow">On this page</p><a href="#conception">Conception of the idea</a><a href="#mission">Mission</a><a href="#vision">Vision</a></aside><div id="conception">${sectionHead("Origins", "Conception of the idea")}
    <p>Shantha Ruban, an eminent figure acclaimed among the World’s 100 Global Tech Innovators, is a visionary serial tech entrepreneur. He is also the Founder of 5 tech companies in the UK where he currently serves as the Group CEO developing world-class solutions, and shaping the digital landscape with cutting-edge technology.</p>
    <p>One auspicious day, Shantha arrived at one of the group companies well before the usual bustle of the office. To his surprise, a group of young employees had already taken charge of the boardroom early that morning. Intrigued, Shantha decided to quietly observe.</p>
    <blockquote>“I told them to carry on and I observed, I saw our Technologist and Senior tech lead Mayuran giving lecture to the new employees on practical examples of coding, how to code and industry best practices, he was doing such a fantastic job and these new employees were university graduates who had at least 5 years of education and internships before they joined the company, but they still needed training and more resources to get ready for their role in the company.”</blockquote>
    <p>Later, Shantha engaged with his childhood friend Dr. Neil Anthony-Pillai in a discussion about this transformative incident. Together, they unearthed a grander vision for Sri Lanka.</p>
    <p>Dr. Neil Anthony-Pillai, a luminary boasting four decades of experience in both tech and training, felt an immediate resonance with Shantha’s vision. In a bold move, he relinquished his significant role in the UK, dedicating himself to sculpting global tech innovators right here in Sri Lanka.</p>
    <figure><img src="/assets/images/story-tech.png" alt="Unicom TIC students learning technology" loading="lazy"><figcaption>Skills Today, Success Tomorrow.</figcaption></figure>
    <p>As the idea matured into reality Jon Guffastan, renowned as one of the world’s foremost technicians joined the team along with Mayooran Somasundaram and Anushyanthan Selvanayagam who were driven by the same noble mission. Today, we stand fortified by the backing of multinational IT giants, esteemed institutions, and global tech trailblazers.</p>
    <p>Unicom TIC stands poised to empower and equip students who will undergo workshops and attend interviews conducted regionally. Selected students will then participate in the certificate and diploma program, with guaranteed job placements on successful completion of the course.</p>
    <div class="mission-vision"><section id="mission"><p class="eyebrow">Mission</p><h2>Mission</h2><p>To inspire, empower and produce employable Sri Lanka’s next generation of digital innovators; from grassroots to greatness.</p></section><section id="vision"><p class="eyebrow">Vision</p><h2>Vision</h2><p>Envisioning a Sri Lanka where every determined individual, regardless of background, is equipped with cutting-edge technology skills, and empowered by our nation’s renowned logical thinking.</p></section></div>
  </div></div></article>`
});

const meetTeam = () => layout({ path:"/meet-the-team/", title:"Meet the Team - Unicom TIC", description:"Meet the founders, technology leaders, advisors, and program team behind Unicom TIC.", image:"/assets/images/team-hero.png", body:`${pageHero({title:"Meet the Team", intro:"The people driving Unicom TIC forward.", image:"/assets/images/team-hero.png"})}<section class="section"><div class="container">${sectionHead("Leadership", "Meet the Team", "Our founding Directors, proud children of Sri Lanka, boast a collective experience of over 80 years in the global IT industry. Their visionary leadership is supported by a team of distinguished professors, accomplished leaders, and tech pioneers from diverse backgrounds and nationalities.")}${teamCards()}</div></section>` });

const journeyGroups = [
  ["Jaffna", ["journey-jaffna-01.jpg","journey-jaffna-02.jpg","journey-jaffna-03.jpg","journey-jaffna-04.jpg"]],
  ["Batticaloa", ["journey-batticaloa-01.jpg","journey-batticaloa-02.jpg","journey-batticaloa-03.jpg"]],
  ["Nuwara Eliya", ["journey-nuwara-01.jpg","journey-nuwara-02.jpg","journey-nuwara-03.jpg","journey-nuwara-04.jpg"]],
  ["Vavuniya", ["journey-vavuniya-01.jpg","journey-vavuniya-02.jpg","journey-vavuniya-03.jpg","journey-vavuniya-04.jpg"]]
];

const journeyAssetVersion = "20261005-4";
const gallery = (files, label) => `<div class="photo-grid" data-photo-count="${files.length}">${files.map((file, i) => {
  const src = `/assets/images/${file}?v=${journeyAssetVersion}`;
  return `<button type="button" class="photo" data-lightbox data-lightbox-group="${esc(label)}" data-lightbox-index="${i}" data-src="${src}" aria-label="Open ${esc(label)} photo ${i+1}"><img src="${src}" alt="${esc(label)} moment ${i+1}" loading="lazy" width="800" height="600"></button>`;
}).join("")}</div>`;

const pressSizes = [[957,381],[993,723],[1448,2048],[1448,2048]];
const pressCarousel = (files) => `<div class="press-carousel" data-press-carousel>
  <div class="press-carousel__meta"><div class="press-carousel__dots" aria-label="Choose press image">${files.map((_, i) => `<button type="button" aria-label="Show press image ${i+1}" class="${i === 0 ? "is-active" : ""}" data-press-dot="${i}"></button>`).join("")}</div><p aria-live="polite" data-press-status>01 / ${String(files.length).padStart(2,"0")}</p><div class="press-carousel__controls"><button type="button" class="press-carousel__arrow press-carousel__arrow--prev" aria-label="Previous press image" title="Previous image" data-press-prev>${icon("arrow")}</button><button type="button" class="press-carousel__arrow press-carousel__arrow--next" aria-label="Next press image" title="Next image" data-press-next>${icon("arrow")}</button></div></div>
  <div class="press-carousel__window">
    <div class="press-carousel__track" data-press-track>${files.map((file, i) => {
      const src = `/assets/images/${file}?v=${journeyAssetVersion}`;
      return `<button type="button" class="press-carousel__slide" data-press-slide data-lightbox data-lightbox-group="Press coverage" data-lightbox-index="${i}" data-src="${src}" aria-label="Open press coverage image ${i+1}" aria-hidden="${i === 0 ? "false" : "true"}"${i === 0 ? "" : " inert"}><img src="${src}" alt="Press coverage moment ${i+1}" loading="lazy" width="${pressSizes[i][0]}" height="${pressSizes[i][1]}" draggable="false"></button>`;
    }).join("")}</div>
  </div>
</div>`;

const testimonialVideos = [
  "https://unicomtic.org/wp-content/uploads/2025/01/LAST-VIDEO.mp4",
  "https://unicomtic.org/wp-content/uploads/2025/01/The-inauguration-of-CHERYMANY-was-a-huge-success.mp4",
  "https://unicomtic.org/wp-content/uploads/2025/01/Lighting-of-the-Lamps-%F0%9F%92%A1.mp4"
];

const journeysSchema = [
  {
    "@type": "CollectionPage",
    "@id": "https://unicomtic.org/home/inspiring-journeys/#collection",
    name: "Inspiring Journeys",
    url: "https://unicomtic.org/home/inspiring-journeys/",
    description: "Explore Unicom TIC workshops, inauguration, mentoring, media coverage, and testimonials across Sri Lanka.",
    image: "https://unicomtic.org/assets/images/journeys-hero.jpg",
    mainEntity: {
      "@type": "ImageGallery",
      name: "Unicom TIC Inspiring Journeys gallery",
      image: [
        ...journeyGroups.flatMap(([, files]) => files.map(file => `https://unicomtic.org/assets/images/${file}`)),
        ...["inauguration-01.jpg","inauguration-02.jpg","inauguration-03.jpg","inauguration-04.jpg","press-01.jpg","press-02.jpg","press-03.jpg","press-04.jpg","commission-01.png","commission-02.png","mentoring-01.jpg","mentoring-02.jpg","mentoring-03.jpg","mentoring-04.jpg","mentoring-05.jpg","mentoring-06.jpg"].map(file => `https://unicomtic.org/assets/images/${file}`)
      ]
    }
  },
  {
    "@type": "VideoObject",
    name: "Unicom TIC Inception video",
    description: "The Unicom TIC inception video.",
    embedUrl: "https://www.youtube-nocookie.com/embed/65_GqX2xojs",
    thumbnailUrl: "https://unicomtic.org/assets/images/inception-preview.jpg"
  },
  ...testimonialVideos.map((contentUrl, index) => ({
    "@type": "VideoObject",
    name: `Unicom TIC testimonial ${index + 1}`,
    description: `Unicom TIC testimonial video ${index + 1}.`,
    contentUrl,
    thumbnailUrl: `https://unicomtic.org/assets/images/testimonial-preview-${index + 1}.jpg`
  }))
];

const videoPreview = (poster, label) => `<button type="button" class="journey-video__preview" data-journey-preview aria-label="Play ${esc(label)}" title="Play ${esc(label)}"><img src="/assets/images/${poster}" alt="" data-journey-preview width="${poster === "inception-preview.jpg" ? 480 : 1920}" height="${poster === "inception-preview.jpg" ? 360 : 1080}" loading="lazy"><span class="journey-video__play">${icon("play")}</span></button>`;
const videoFeedback = () => `<div class="journey-video__feedback" data-media-feedback role="status" hidden><span data-media-status></span><button type="button" data-video-retry aria-label="Retry video" title="Retry video">${icon("refresh")}</button></div>`;

const testimonialShowcase = () => `<div class="testimonial-showcase" data-testimonial-showcase>
  <div class="testimonial-selector" role="tablist" aria-label="Testimonials">${testimonialVideos.map((_, index) => `<button type="button" id="testimonial-tab-${index + 1}" class="testimonial-selector__button${index === 0 ? " is-active" : ""}" role="tab" aria-selected="${index === 0 ? "true" : "false"}" aria-controls="testimonial-panel-${index + 1}" data-testimonial-tab="${index}"><span>${String(index + 1).padStart(2,"0")}</span><strong>Testimonial ${String(index + 1).padStart(2,"0")}</strong>${icon("arrow")}</button>`).join("")}</div>
  <div class="testimonial-stage">
    ${testimonialVideos.map((src, index) => `<div id="testimonial-panel-${index + 1}" class="testimonial-panel" role="tabpanel" aria-labelledby="testimonial-tab-${index + 1}" data-testimonial-panel${index === 0 ? "" : " hidden"}><div class="journey-video" data-journey-video>${videoPreview(`testimonial-preview-${index + 1}.jpg`, `Unicom TIC testimonial ${index + 1}`)}<video src="${src}" title="Unicom TIC testimonial ${index + 1}" poster="/assets/images/testimonial-preview-${index + 1}.jpg" controls preload="none" playsinline controlsList="nodownload" hidden>Your browser does not support the video tag.</video>${videoFeedback()}</div></div>`).join("")}
    <div class="testimonial-stage__meta"><p aria-live="polite" data-testimonial-status>01 / ${String(testimonialVideos.length).padStart(2,"0")}</p><div class="testimonial-stage__controls"><button type="button" aria-label="Previous testimonial" title="Previous testimonial" data-testimonial-prev>${icon("arrow")}</button><button type="button" aria-label="Next testimonial" title="Next testimonial" data-testimonial-next>${icon("arrow")}</button></div></div>
  </div>
</div>`;

const journeys = () => layout({
  path:"/home/inspiring-journeys/", title:"Inspiring Journeys - Unicom TIC", description:"Explore Unicom TIC workshops, inauguration, mentoring, media coverage, and testimonials across Sri Lanka.", image:"/assets/images/journeys-hero.jpg",
  bodyClass:"journeys-page", assetVersion:"20261007-journeys-7", schema:journeysSchema,
  body:`${pageHero({eyebrow:"From grassroots to greatness", title:"Inspiring Journeys", intro:"The workshops, milestones, mentorship and people behind the Unicom TIC mission.", image:"/assets/images/journeys-hero.jpg", position:"center 45%"})}
    <nav class="journey-tabs" aria-label="Inspiring journeys sections"><div class="container"><a href="#inception">Inception</a><a href="#workshops">Workshops</a><a href="#inauguration">Inauguration - 2024</a><a href="#media">Media</a><a href="#mentoring">Mentoring</a><a href="#testimonials">Testimonials</a></div></nav>
    <section class="section" id="inception"><div class="container inception-layout"><div class="video-frame inception-video journey-video" data-journey-video>${videoPreview("inception-preview.jpg", "Inception video")}<iframe src="https://www.youtube-nocookie.com/embed/65_GqX2xojs?rel=0" title="Inception video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen hidden></iframe>${videoFeedback()}</div><div class="mission-vision"><section><p class="eyebrow">Mission</p><h2>Mission</h2><p>To inspire, empower and produce employable Sri Lanka’s next generation of digital innovators; from grassroots to greatness.</p></section><section><p class="eyebrow">Vision</p><h2>Vision</h2><p>Envisioning a Sri Lanka where every determined individual, regardless of background, is equipped with cutting-edge technology skills, and empowered by our nation’s renowned logical thinking.</p></section></div></div></section>
    <section class="section section--soft" id="workshops"><div class="container">${sectionHead("Across Sri Lanka", "Workshops")}<div class="gallery-groups">${journeyGroups.map(([name, files]) => `<section><h3>${name}</h3>${gallery(files, name)}</section>`).join("")}</div></div></section>
    <section class="section" id="inauguration"><div class="container split-feature"><div>${sectionHead("March 16, 2024", "Inauguration - 2024")}<p>On March 16, 2024, the inauguration ceremony of Unicom TIC marked a significant milestone in empowering tech innovators in Sri Lanka. Attended by distinguished guests and industry leaders, the event featured speeches from Shantha Ruban, Founder and Group CEO, and Dr. Neil Anthony-Pillai, co-founder and tech veteran, who highlighted the center’s mission to bridge the gap between education and industry.</p><p>The ceremony included a ribbon-cutting event, symbolizing the official opening of the center. Guests toured the modern facilities, which feature advanced classrooms and collaborative workspaces designed to enhance the learning experience.</p></div>${gallery(["inauguration-01.jpg","inauguration-02.jpg","inauguration-03.jpg","inauguration-04.jpg"], "Inauguration")}</div></section>
    <section class="section section--dark" id="media"><div class="container">${sectionHead("Coverage", "In the press...")}${pressCarousel(["press-01.jpg","press-02.jpg","press-03.jpg","press-04.jpg"])}</div></section>
    <section class="section" id="mentoring"><div class="container"><div class="commission-feature">${sectionHead("Global connection", "British High Commission - Colombo")}${gallery(["commission-01.png","commission-02.png"], "British High Commission - Colombo")}</div><div class="journey-mentoring-gallery">${sectionHead("Mentoring", "Mentorship, Lectures & Graduation Gallery")}${gallery(["mentoring-01.jpg","mentoring-02.jpg","mentoring-03.jpg","mentoring-04.jpg","mentoring-05.jpg","mentoring-06.jpg"], "Mentorship, Lectures & Graduation")}</div></div></section>
    <section class="section section--soft testimonials-section" id="testimonials"><div class="container">${sectionHead("Student voices", "Testimonials")}${testimonialShowcase()}</div></section>
    <dialog class="lightbox" data-lightbox-dialog aria-label="Image viewer"><div class="lightbox__shell"><div class="lightbox__toolbar"><p data-lightbox-counter aria-live="polite">01 / 01</p><button type="button" aria-label="Close image" data-lightbox-close>${icon("close")}</button></div><div class="lightbox__stage"><button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="Previous image" title="Previous image" data-lightbox-prev>${icon("arrow")}</button><figure><img alt="Expanded gallery view" data-lightbox-image><figcaption data-lightbox-label></figcaption></figure><button type="button" class="lightbox__nav lightbox__nav--next" aria-label="Next image" title="Next image" data-lightbox-next>${icon("arrow")}</button></div></div></dialog>`
});

const contact = () => layout({
  path:"/contact/", title:"Contact - Unicom TIC", description:"Contact Unicom Training and Innovation Center in Jaffna by phone, email, WhatsApp, or enquiry form.", image:"/assets/images/contact-hero.jpg",
  body:`<section class="section contact-section"><div class="container contact-grid"><div class="contact-copy"><p class="eyebrow">Contact details</p><h2>General Queries:</h2><a class="contact-line" href="mailto:UnicomTIC@gmail.com">${icon("mail")}<span>UnicomTIC@gmail.com</span></a><a class="contact-line" href="tel:+94740030977">${icon("phone")}<span>Phone: 07400 30 977</span></a><a class="contact-line" href="https://wa.me/94740030977" target="_blank" rel="noopener">${icon("phone")}<span>WhatsApp: 07400 30 977</span></a><div class="contact-line contact-line--address">${icon("map")}<address>Unicom Training and Innovation Center<br>MPCS Building<br>No 127, Kankesanthurai Road<br>Jaffna<br>Sri Lanka</address></div><h3>Connect with us on</h3><div class="social-links social-links--contact"><a href="${site.social.facebook}">Facebook</a><a href="${site.social.instagram}">Instagram</a><a href="${site.social.linkedin}">LinkedIn</a></div></div><form class="enquiry-form" data-whatsapp-form><div><p class="eyebrow">Enquiries</p><h1>Tell us how we can help.</h1></div><div class="form-row"><label>Name<input name="name" required autocomplete="name"></label><label>Phone number<input name="phone" required inputmode="tel" autocomplete="tel"></label></div><label>Email address<input name="email" required type="email" autocomplete="email"></label><label>Your enquiry<textarea name="enquiry" required rows="5"></textarea></label><button class="button button--primary" type="submit">Continue to WhatsApp${icon("arrow")}</button><p class="form-status" aria-live="polite" data-form-status></p></form></div></section>`
});

const alumniReviews = [
  ["Best learning and innovative training center.. I love Unicom TIC", "Seeman Judsonjosuva"],
  ["Simply great", "Abdul Baasith"],
  ["Skills today, Success tomorrow", "Hameem Mohamed Imthath"],
  ["Unicom TIC is an excellent institute. The teaching is very clear, practical, and easy to understand. The staff are friendly and always helpful. Highly recommended for anyone looking to improve their IT skills!", "Thiyagaraja Kissan"],
  ["Had a great learning experience with Unicom TIC. The sessions were highly informative and career-focused. The trainers were very supportive and provided real-time industry insights. It helped me build confidence, improve my technical skills, and prepare for interviews effectively.", "Kavishna Parameshwararaj"],
  ["Unicomtic Institute greatly helped me improve my IT knowledge as well as my management and business skills. The training was practical, well-structured, and delivered by supportive instructors. I gained valuable skills that have boosted my confidence and career growth.", "Abitha Amirthalingam"],
  ["The experience has been extremely beneficial for my learning and career growth. The instructors are very supportive, and the training is practical, helping me to build real-world skills. This program has boosted my confidence and gave me valuable opportunities in the IT field.", "Venujan V"],
  ["I studied software development at Unicom TIC, and that foundation helped me secure my current role in the software industry. Skills Today Success Tomorrow!", "P. Sureka"],
  ["I left my previous job to start a career in IT, and joining Unicomtic was a great decision. I was new to IT, but the trainers explained everything clearly and patiently. The practical training improved my confidence, and now I feel ready to build my future in this field.", "Dayana Santhiran"],
  ["As a student of Unicomtic, I’m really happy with the education and support here. Trainers are friendly and explain concepts clearly. We get both theory and practical in a well-organized way. Real-world project exposure has boosted my confidence and technical skills.", "Anoint Annet"],
  ["UnicomTic has played a major role in improving my technical skills and career growth in the IT field. It helped enhance my learning skills, boosted my confidence, and strengthened my technical knowledge. I am truly grateful for the support and guidance I received.", "S. Nivethiga"],
  ["This IT center offers high-quality, practical training delivered by expert instructors. It is definitely the best choice for anyone aiming for a quick career start in the tech industry.", "Suresh Thenushan"]
];

const alumniStory = ({ name, image, introduction, paragraphs, pdf, active = false }) => `
  <article class="alumni-story${active ? " is-active" : ""}" data-alumni-slide aria-hidden="${active ? "false" : "true"}"${active ? "" : " inert"}>
    <figure class="alumni-story__profile">
      <img src="${image}" alt="${esc(name)}" loading="lazy" width="400" height="400">
      <figcaption>
        <p class="alumni-story__rating" aria-label="Five out of five stars">★★★★★</p>
        <h3>${esc(name)}</h3>
        <p>Associate Software Engineer</p>
        <p>Unicorn Connected Apps</p>
      </figcaption>
    </figure>
    <div class="alumni-story__copy">
      <p class="alumni-story__lead">${esc(introduction)}</p>
      <details>
        <summary>Read More${icon("plus")}</summary>
        <div class="alumni-story__full">
          ${paragraphs.map(paragraph => `<p>${esc(paragraph)}</p>`).join("")}
          ${pdf ? `<a class="text-link" href="${pdf}" target="_blank" rel="noopener">Download Full Story (PDF)${icon("download")}</a>` : ""}
        </div>
      </details>
    </div>
  </article>`;

const alumni = () => layout({
  path:"/alumini/",
  title:"Alumini - Unicom TIC",
  description:"Discover what our graduates achieved in 2024. High-impact tech transformations, 102+ graduates, 62% job placement, and authentic student reviews.",
  image:"/assets/images/alumni-hero.jpg",
  bodyClass:"page-alumni",
  body:`<section class="section alumni-stories"><div class="container"><div class="alumni-stories__head">${sectionHead("Stories", "Featured Stories", "Impactful transformations from the past year.", "", "h1")}<div class="alumni-carousel__controls"><button type="button" aria-label="Previous story" title="Previous story" data-alumni-prev>${icon("arrow")}</button><button type="button" aria-label="Next story" title="Next story" data-alumni-next>${icon("arrow")}</button></div></div><div class="alumni-carousel" data-alumni-carousel><div class="alumni-carousel__window"><div class="alumni-story-list" data-alumni-track>
      ${alumniStory({
        name:"Sankeerthan Dayanithi",
        image:"/assets/images/alumni-sankeerthan.jpg?v=20261005-1",
        active:true,
        introduction:"\"Before joining this institute, my focus was entirely on preparing for my A Level examinations with the hope of entering university. I was not exploring any professional direction, and I had very limited awareness of the opportunities available in the IT field. It was actually a friend who encouraged me to apply here, and that decision marked the beginning of a significant change in my life.\"",
        paragraphs:[
          "From the beginning, the institute offered an environment that was both supportive and professional. The staff members were consistently dedicated to our development. Their guidance went beyond academic instruction. They were genuinely committed to helping us improve and become better prepared for the real world.",
          "Our learning experience included programming lessons conducted by individuals currently working in the industry. This exposure allowed us to understand practical expectations and real project challenges. Alongside the technical subjects, we also studied business management, English, and business analysis. These additional areas strengthened our understanding of how organizations operate and how projects are managed from start to finish.",
          "One of the biggest changes in me was in how I handled responsibility. I slowly developed leadership qualities, understood how to work with others, and learned how to take ownership of tasks without fear. The institute directly guided us through an interview opportunity and a capstone project that became a key factor in securing my current job at Unicorn Connected Apps.",
          "This place changed my path completely. It gave me knowledge, direction, and a start to a future that once felt out of reach. In every way, it shaped the life I am living today."
        ]
      })}
      ${alumniStory({
        name:"Gopikrishna Sivapakthan",
        image:"/assets/images/alumni-gopikrishna.png?v=20261005-1",
        introduction:"\"My Journey Into the World of IT: A Path I Never Saw Coming. Life has a funny way of leading us where we’re meant to be, even when the path looks completely different from what we imagined. My name is Gopikrishna, and I’m from Batticaloa, Sri Lanka. IT was never my dream career during my school days... but everything changed after completing A/Ls.\"",
        paragraphs:[
          "After finishing my exams, I sent out 20+ CVs to various companies with no responses, no calls, and no interviews. It was deeply discouraging. Then one day, I came across an advertisement from Unicom TIC. Without expecting much, I applied. A few days later, I was shortlisted — and that became the turning point of my life.",
          "The two founding directors — Mr. Shantha Ruban and Dr. Neil Anthony-Pillai — shaped the program far beyond traditional IT training. They taught us how the industry works, how technology solves real-world business problems, and how to think like engineering professionals rather than students.",
          "I completed three comprehensive milestone projects and conducted a student-led school IT outreach programme. By the end of the program, something I once struggled with became my everyday reality: I secured a career in the IT industry. Looking back, I am deeply grateful for all the challenges, mentorship, and opportunities provided by Unicom TIC."
        ]
      })}
      ${alumniStory({
        name:"Reka Jajeindren",
        image:"/assets/images/alumni-reka.jpg?v=20261005-1",
        introduction:"\"I stepped into the world of tech with nothing but curiosity. Not a single programming concept. Not a tech background. Just a Bio student with basic O/L IT knowledge and a stubborn passion to learn something new. When the acceptance email arrived, everything shifted.\"",
        paragraphs:[
          "Programming wasn’t gentle with me at the beginning. But the moment we stepped into backend logic, everything clicked. I finally felt deeply connected to programming: the logic, the architecture, the depth.",
          "I can’t talk about my journey without mentioning Dr. Neil. His guidance, his energy, and his explanations motivated me every single time. And Shantha sir's BRD sessions and communication coaching instilled fearless confidence. Presentations once terrified me, but the mentorship pushed me outside my comfort zone and broke barriers I didn’t know I had.",
          "Today, I’m working at Unicorn Connected Apps, learning cutting-edge technologies every day. Unicom TIC planted the seed for my entire career."
        ],
        pdf:"/assets/docs/My Unicom TIC Journey - Reka Jajeindren.pdf"
      })}
      ${alumniStory({
        name:"Thenuja Satheeskumar",
        image:"/assets/images/alumni-thenuja.png?v=20261005-1",
        introduction:"\"Hi, I am Thenuja Satheeskumar from Kilinochchi. I completed my A/Ls in 2021 in the Bio stream. Software engineering felt like a distant dream because of private university costs. When I saw Unicom TIC's 100% free program advertisement, it felt too good to be true. I attended the Vavuniya workshop, and that workshop changed everything.\"",
        paragraphs:[
          "There was no pressure about degrees or marks; it was about passion, logic, and teamwork. When I received my acceptance letter, I was overjoyed. Starting in Jaffna on April 1st, 2024, our lecturers — from industry software engineers to Tech Lead Mayooran sir — guided us patiently from basic HTML/CSS to JavaScript, Angular, C#, SQL, and cloud deployment.",
          "On January 5th, 2025, the moment I had dreamed of finally arrived: a Conditional Job Offer from Unicom Connected Apps as a Software Developer. For the first time in my life, I could proudly call myself a software developer. Unicom TIC opened a door I thought would always remain closed."
        ],
        pdf:"/assets/docs/My Journey Through Unicom TIC- Thenuja Satheeskumar.pdf"
      })}
    </div></div><div class="alumni-carousel__meta"><div class="alumni-carousel__dots" aria-label="Choose featured story">${[0,1,2,3].map((index) => `<button type="button" aria-label="Show story ${index + 1}" class="${index === 0 ? "is-active" : ""}" data-alumni-dot="${index}"></button>`).join("")}</div><p aria-live="polite" data-alumni-status>01 / 04</p></div></div></div></section>
    <section class="section section--soft alumni-reviews"><div class="container">${sectionHead("Graduate voices", "What Our Graduates Say", "Quick feedback on our program quality, career impact, and mentorship from the Class of 2024.")}<div class="alumni-review-grid">${alumniReviews.map(([quote, author]) => `<blockquote><p>${esc(quote)}</p><footer>${esc(author)}</footer></blockquote>`).join("")}</div></div></section>
    <section class="section alumni-cta"><div class="container"><h2>Ready to Begin Your Tech Journey?</h2><p>Join the next cohort of passionate students and transform your future with a 100% funded scholarship.</p><div class="button-row">${button("Register Now for 2026", site.applyUrl, "light", 'target="_blank" rel="noopener"')}${button("Download 2026 Brochure", site.brochure, "outline-light", 'target="_blank"')}</div></div></section>`
});

const students = () => layout({ path:"/students/", title:"Students Hub - Unicom TIC", description:"Learn about the Unicom TIC student scholarship journey, selection process, training, and student FAQs.", image:"/assets/images/students-hero.png", body:`${pageHero({eyebrow:"Explore Your Journey to Success", title:"Welcome to Unicom TIC - Students' Corner", intro:"As a student at Unicom TIC, you embark on a transformative journey towards a successful career in the world of technology.", image:"/assets/images/students-hero.png"})}<section class="section"><div class="container">${sectionHead("Student experience", "Why Join Unicom TIC?", "Here are four compelling reasons why Unicom TIC should be your choice")}${cardGrid(reasons)}</div></section><section class="section section--dark"><div class="container">${sectionHead("Admissions", "How to Join Unicom TIC")}<ol class="timeline">${[["APPLICATION","Everyone registering an interest will receive an application form. This is designed to evaluate the logical thinking capacity and passion for technology of the applicants."],["WORKSHOPS & INTERVIEWS","Selected candidates from stage – 1 will be invited to attend a workshop and interview to be held across the regions designed to identify the suitable candidates for the course. All suitable candidates are eligible for 100% Scholarship."],["TRAINING PROGRAM","Successful candidates from the selection process will be awarded a 100% scholarship to attend the 9-month program at our UnicomTic Training and Innovation Centre in Jaffna."]].map(([t,x],i)=>`<li><span>STAGE ${i+1}</span><div><h3>${t}</h3><p>${x}</p></div></li>`).join("")}</ol><div class="section-actions">${button("Download our Brochure", site.brochure, "light", 'target="_blank"')}</div></div></section>${faqBlock("Students", studentFaqs)}` });

const lecturerFaqs = [
  ["How do I apply to become a lecturer at Unicom TIC?", "To apply, simply visit our website and navigate to the “Lecturers” section. There, you’ll find the application form and detailed instructions on how to proceed."],
  ["What qualifications are required to become a lecturer?", "We prefer candidates with a minimum of a bachelor’s degree in a relevant field and substantial industry experience. A minimum of 4 years of coaching experience is mandatory."],
  ["What subjects and courses will I be teaching?", "The subjects and courses will be related to cutting-edge technology skills, including programming languages, software development, data science, and more."],
  ["How often are lectures conducted?", "Lectures are typically scheduled on specific days of the week, with options for both full-time and part-time positions. The exact schedule will be discussed during the interview process."],
  ["Can I conduct workshops or additional learning sessions?", "Yes, we encourage lecturers to organize workshops and extra sessions to enhance students’ understanding and practical skills."],
  ["Are there opportunities for career growth within Unicom TIC?", "Yes, exceptional lecturers may have the chance to take on leadership roles or contribute to curriculum development and enhancement."]
];
const studentFaqs = [
  ["What is the Full Scholarship Program?", "The Full Scholarship Program is a comprehensive nine-month, face-to-face coaching program that provides top-tier training in the tech field. It covers all costs associated with training, allowing passionate individuals to focus solely on honing their skills."],
  ["Is the Full Scholarship Program entirely free of cost?", "Yes, the program is a 100% scholarship initiative. It covers all expenses related to coaching and training."],
  ["What qualifications do I need to apply for the Full Scholarship Program?", "We welcome passionate individuals from diverse backgrounds. Specific eligibility criteria will be detailed during the application process."],
  ["How long does it take to complete the program?", "The Full Scholarship Program is designed to be completed within nine months, ensuring rapid skill development."],
  ["What coaching methods are employed in the program?", "The program combines various dynamic coaching methods, including practical sessions, workshops, and lectures delivered by industry experts."],
  ["Who are the instructors in the Full Scholarship Program?", "Our instructors are seasoned experts with extensive industry experience. They are dedicated to providing you with the best possible training and preparing you for success in the digital landscape."]
];
function faqBlock(label, faqs) { return `<section class="section section--soft"><div class="container faq-layout"><div>${sectionHead("Your questions answered", `${label}' FAQs`)}</div><div class="faq-list">${faqs.map(([q,a])=>`<details><summary>${esc(q)}${icon("plus")}</summary><p>${esc(a)}</p></details>`).join("")}</div></div></section>`; }

const lecturers = () => layout({ path:"/lecturers-hub/", title:"Lecturers Hub - Unicom TIC", description:"Explore lecturer opportunities, responsibilities, support, and FAQs at Unicom TIC.", image:"/assets/images/lecturers-hero.png", body:`${pageHero({title:"Welcome to Unicom TIC - Lecturers' Hub", intro:"Where expertise meets innovation and industry professionals shape the future of tech.", image:"/assets/images/lecturers-hero.png"})}<section class="section"><div class="container">${sectionHead("Lecturers Hub", "Why Lecture at Unicom TIC?")} ${cardGrid([{title:"Cutting-Edge Curriculum",text:"Access a well-structured curriculum designed to equip students with the latest technology skills and logical thinking abilities, ensuring they’re industry-ready upon graduation."},{title:"Collaborative Environment",text:"Join a team of highly successful world-class tech leaders who are passionate about tech. At Unicom TIC, collaboration and continuous learning are ingrained in our culture."},{title:"Job Satisfaction",text:"Experience a fulfilling career where you witness firsthand the growth and development of your students."},{title:"Impactful Contribution",text:"At Unicom TIC, you’re not just coaching; you’re shaping the future of the Sri Lankan tech landscape."}])}<div class="editorial-grid lecturer-details"><div><h3>Job Description</h3><p>As a lecturer at Unicom TIC, you will:</p><ul><li>Conduct engaging lectures and workshops to equip students with in-demand technology skills.</li><li>Create and deliver lesson plans, assignments, and assessments aligned with industry standards.</li><li>Foster a supportive learning environment, providing guidance and mentorship to students.</li><li>Collaborate with fellow innovators and industry experts to continuously improve the curriculum.</li></ul></div><div><h3>Compensation</h3><p>All lecturers at Unicom TIC Foundation will be compensated at competitive industry rates, reflecting the value of your expertise and commitment to shaping the future of Sri Lanka’s tech industry.</p>${button("Contact Us", "/contact/", "secondary")}</div></div></div></section>${faqBlock("Lecturers", lecturerFaqs)}` });

const faq = () => layout({ path:"/faq/", title:"FAQ - Unicom TIC", description:"Answers to common questions about Unicom TIC scholarships, students, lecturers, training, and applications.", image:"/assets/images/faq-hero.jpg", body:`${pageHero({title:"Frequently Asked Questions", intro:"Answers about the Unicom TIC scholarship program, learning journey, and lecturer opportunities.", image:"/assets/images/faq-hero.jpg"})}${faqBlock("Students", studentFaqs)}${faqBlock("Lecturers", lecturerFaqs)}<section class="section compact-cta"><div class="container"><div><p class="eyebrow">Still have questions?</p><h2>Contact the Unicom TIC team.</h2></div>${button("Contact Us", "/contact/", "primary")}</div></section>` });

const conductItems = {
  "Student Code of Conduct": ["Commitment to Learning","Respect for Diversity","Academic Integrity","Attendance and Punctuality","Professional Development and Networking","Discipline and Conduct","Reporting Violations"],
  "Lecturers Code of Conduct": ["Academic Excellence","Professionalism","Respect and Inclusivity","Feedback and Evaluation","Confidentiality","Continuous Learning","Adherence to Program Policies","Ethical Conduct","Mentorship and Support","Collaboration and Engagement"]
};
const conduct = () => layout({ path:"/code-of-conduct/", title:"Code of Conduct - Unicom TIC", description:"Read the Unicom TIC code of conduct for students and lecturers.", image:"/assets/images/programs-hero.png", body:`${pageHero({title:"Unicom TIC Code of Conduct", intro:"A respectful, inclusive and enriching learning environment for every member of our community.", image:"/assets/images/programs-hero.png"})}<section class="section"><div class="container conduct-grid">${Object.entries(conductItems).map(([title,items],group)=>`<section><p class="eyebrow">${group ? "Lecturers" : "Students"}</p><h2>${title}</h2><p>${group ? "To ensure a conducive space for growth and innovation, we expect each lecturer to adhere to the following comprehensive Code of Conduct" : "Welcome to Unicom TIC! We are dedicated to providing an inclusive and enriching learning environment for all our students. To ensure a conducive space for growth and innovation, we expect each student to adhere to the following comprehensive Code of Conduct:"}</p><div class="principle-list">${items.map((x,i)=>`<article><span>${String(i+1).padStart(2,"0")}</span><h3>${x}</h3></article>`).join("")}</div></section>`).join("")}</div></section><section class="section section--dark"><div class="container narrow">${sectionHead("Accountability", "Consequences of Violations")}<p>Violations of this Code of Conduct may result in disciplinary action, which may include warnings, probation, suspension, or, in severe cases, expulsion from the program and the Organisation.</p><p>By joining Unicom TIC, you commit to upholding these principles and contributing to a vibrant and thriving learning community.</p></div></section>` });

export const pages = [
  { path:"/", file:"index.html", render:home },
  { path:"/home/inspiring-journeys/", file:"home/inspiring-journeys/index.html", render:journeys },
  { path:"/contact/", file:"contact/index.html", render:contact },
  { path:"/alumini/", file:"alumini/index.html", render:alumni },
  { path:"/programs/", file:"programs/index.html", render:programsPage },
  { path:"/our-story/", file:"our-story/index.html", render:ourStory },
  { path:"/meet-the-team/", file:"meet-the-team/index.html", render:meetTeam },
  { path:"/students/", file:"students/index.html", render:students },
  { path:"/lecturers-hub/", file:"lecturers-hub/index.html", render:lecturers },
  { path:"/faq/", file:"faq/index.html", render:faq },
  { path:"/code-of-conduct/", file:"code-of-conduct/index.html", render:conduct }
];
