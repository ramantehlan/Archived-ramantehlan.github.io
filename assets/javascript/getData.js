// To create a new element
// type: 'tag' of new element, example:- div, a, img Fetch
// attribute: 'object' of all the attributes for that elelement
// content: 'text' content of the new Elements
// child: 'array' of the child of this element
function createElement(type, attribute = null, content = null, child = null) {
  let element = document.createElement(type)

  // Add content to element
  if (content != null) {
    let textNode = document.createTextNode(content)
    element.appendChild(textNode)
  }

  // Set attributes using loop
  // key will be name of attribute
  // value will be the value of attribute
  $.each(attribute, function(key, value) {
    element.setAttribute(key, value)
  })

  // add child by appending them
  $.each(child, function(key, value) {
      element.appendChild(value)
  })

  // return back the element
  return element
}

// To display all the infromation from the json file
function displayData(data) {

  // Setting meta tag values for the document
  $('head').append('<meta name="author" content="' + data.document.author + '">');
  $('head').append('<meta name="title" content="' + data.document.title + '">');
  $('head').append('<meta name="keywords" content="' + data.document.keywords + '">');
  $('head').append('<meta name="description" content="' + data.document.description + '">');
  $('head').append('<meta name="language" content="' + data.document.language + '">');
  $('head').append('<meta charset="' + data.document.charset + '">');
  $('head').append('<meta name="robots" content="' + data.document.robots + '">');
  $('head').append('<meta name="google-site-verification" content="' + data.document.google_site_verificatin + '">');

  // Elements
  let profile_elements = [];
  let profile_links = [];

  // indirect childs
  let profile_image = createElement("img", {
    "src": data.profile.image
  });


  $.each(data.profile.link, function(key, value){
      if(data.profile.link[key].active == true){
        let finalForm = []
        let content = data.profile.link[key].label;

        finalForm.push(createElement("img", {
          "src": data.profile.link[key].iconUrl,
          "alt": data.profile.link[key].name
        }))

        if(data.profile.link[key].url != ""){
          finalForm.push(createElement("a", {
            "href": data.profile.link[key].url
          }, data.profile.link[key].label))
          content = null
        }

        profile_links.push(createElement("div",{
            "class" : "link"
        }, content, finalForm))
      }
  })



  // direct childs
  profile_elements.push(createElement("div", {
    "class": "profile_pic"
  }, null, [profile_image]))

  profile_elements.push(createElement("h1", {
    "class": "profile_name"
  }, data.profile.name))

  profile_elements.push(createElement("h2", {
    "class": "profile_domains"
  }, data.profile.domains))

  profile_elements.push(createElement("div", {
    "class": "profile_about"
  }, data.profile.vision))

  profile_elements.push(createElement("div", {
    "class": "profile_links"
  }, null , profile_links))



  // Adding all the nodes
  let profile_box = $(".profile_box");
  $.each(profile_elements, function(key, value){
    profile_box.append(value);
  });

}

// To check is document is ready
$(document).ready(function() {

  // Fetch the data.json file and handle various situations
  let test = $.getJSON("data.json", function(data) {
    console.log("~File access complete.")
  }).done(function(data) {
    // To display fetched data
    displayData(data);
    console.log("~Fetching complete.")
  }).fail(function(data, textStatus, error) {
    console.log("~Getting Error in getting JSON.")
    console.error("getJSON failed, status: " + textStatus + ", error: " + error)
  }).always(function() {
    console.log("~Always complete.");
  })

})
