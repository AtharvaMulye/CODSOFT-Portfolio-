$(document).ready(() => {
  const headerArea = $(".header-area");
  const headerLinks = $(".header ul li a");
  const revealConfig = {
    distance: "100px",
    duration: 2000,
    delay: 200,
  };

  $(window).scroll(() => {
    const scrollTop = $(window).scrollTop();
    if (scrollTop > 1) {
      headerArea.addClass("sticky");
    } else {
      headerArea.removeClass("sticky");
    }
    updateActiveSection(headerLinks, scrollTop);
  });

  headerLinks.click(async (e) => {
    e.preventDefault();
    const target = $(e.target).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    try {
      await scrollToTarget(target);
      headerLinks.removeClass("active");
      $(e.target).addClass("active");
    } catch (error) {
      console.error("Error scrolling:", error);
    }
  });

  ScrollReveal(revealConfig);

  const revealElements = [
    ".header a", ".profile-photo", ".about-content", ".education",
    ".header ul", ".profile-text", ".about-skills", ".internship",
    ".project-title", ".contact-title", ".projects", ".contact"
  ];

  revealElements.forEach((selector, index) => {
    ScrollReveal().reveal(selector, { origin: index % 2 === 0 ? "left" : "right" });
  });

  const form = document.forms["submitToGoogleSheet"];
  const msg = document.getElementById("msg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(form.action, { method: form.method, body: new FormData(form) });
      if (response.ok) {
        msg.innerHTML = "Message sent successfully";
        setTimeout(() => {
          msg.innerHTML = "";
        }, 5000);
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
});

function updateActiveSection(headerLinks, scrollTop) {
  if (scrollTop === 0) {
    headerLinks.removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each((index, element) => {
    const target = $(element).attr("id");
    const offset = $(element).offset().top;
    const height = $(element).outerHeight();

    if (scrollTop >= offset - 40 && scrollTop < offset + height - 40) {
      headerLinks.removeClass("active");
      $(`.header ul li a[href='#${target}']`).addClass("active");
    }
  });
}

async function scrollToTarget(target) {
  if (target === "#home") {
    await $("html, body").animate({ scrollTop: 0 }, 500).promise();
  } else {
    const offset = $(target).offset().top - 40;
    await $("html, body").animate({ scrollTop: offset }, 500).promise();
  }
}
