// To create a new element
// type: 'tag' of new element, example:- div, a, img Fetch
// attribute: 'object' of all the attributes for that elelement
// content: 'text' content of the new Elements
// child: 'array' of the child of this element
function createElement(type, attribute = null, content = null, child = null) {
  let element = document.createElement(type)

  // Add content to element
  if (content != null) {
    element.innerHTML = content;
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

function createLinks(links){
  let stack = [];

  $.each(links, function(key, value){
      if(links[key].active == true){
        let finalForm = []
        let content = links[key].label

        finalForm.push(createElement("img", {
          "src": links[key].iconUrl,
          "alt": links[key].name
        }))

        if(links[key].url != ""){
          finalForm.push(createElement("a", {
            "href": links[key].url
          }, links[key].label))
          content = null
        }

        stack.push(createElement("div",{
            "class" : "link"
        }, content, finalForm))
      }
  })

  return stack;
}

function createItems(data){
  let item = []
  $.each(data, function(key, value){
      let subItems = []

      if(data.hasOwnProperty('url') && value.hasOwnProperty('name')){
        subItems.push(createElement("div", {
          "class": "item_heading"
        }, null , [createElement("a", {"href": value.url}, value.name)]))
      }else if (value.hasOwnProperty('name')) {
        subItems.push(createElement("div", {
          "class": "item_heading"
        }, value.name ))
      }


      subItems.push(createElement("div", {
        "class": "item_subheading"
      }, value.type))

      subItems.push(createElement("div", {
        "class": "item_timeline"
      }, value.timeline))

      if(tagsEnable){
        let tags = []

        $.each(value.tag, function(key, value){
          tags.push(createElement("div", {
            "class": "tag"
          }, value))
        })

        subItems.push(createElement("div", {
          "class": "item_tags"
        }, null, tags))
      }

      subItems.push(createElement("div", {
        "class": "item_details"
      }, value.about))

      let workItem = createElement("div", {
        "class": "item"
      }, null, subItems)

      item.push(workItem)
  })

  return item;
}

function pushData(boxes, elements){
  // Adding all the nodes
  $.each(boxes, function(key1, value1){
    $.each(elements[key1], function(key2, value2){
      boxes[key1].append(value2);
    });
  });
}

// To display all the infromation from the json file
function setData(data) {

  // Setting meta tag values for the document
  $('head').append('<meta name="author" content="' + data.document.author + '">');
  $('head').append('<meta name="title" content="' + data.document.title + '">');
  $('head').append('<meta name="keywords" content="' + data.document.keywords + '">');
  $('head').append('<meta name="description" content="' + data.document.description + '">');
  $('head').append('<meta name="language" content="' + data.document.language + '">');
  $('head').append('<meta charset="' + data.document.charset + '">');
  $('head').append('<meta name="robots" content="' + data.document.robots + '">');
  $('head').append('<meta name="google-site-verification" content="' + data.document.google_site_verificatin + '">');

  let profile_elements = [];
  let welcome_elements = [];
  let work_elements = [];
  let project_elements = [];

  // Minor elements
  let profile_image = createElement("img", {
    "src": data.profile.image
  });

  // profile_elements
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
  }, null , createLinks(data.profile.link)))

  // Welcome_elements
  welcome_elements.push(createElement("div", {
      "class": "super_heading"
  }, data.home.title))

  welcome_elements.push(createElement("div", {
      "class": "super_details"
  }, data.home.body))

  // Work elelements
  work_elements.push(createItems(data.work))

  //project elements
  project_elements.push(createItems(data.projects))


  // store boxes and respactive data
  let boxes = [$("#profile_box"), $("#welcome_section"), $("#work_section"), $("#projects_section")];
  let elements = [profile_elements, welcome_elements, work_elements, project_elements];

  // To push it to html page
  pushData(boxes, elements);
}

// To check is document is ready
$(document).ready(function() {

  // Fetch the data.json file and handle various situations
  let test = $.getJSON("data.json", function(data) {
    console.log("~File access complete.")
  }).done(function(data) {
    // To display fetched data
    setData(data);
    console.log("~Fetching complete.")
  }).fail(function(data, textStatus, error) {
    console.log("~Getting Error in getting JSON.")
    console.error("getJSON failed, status: " + textStatus + ", error: " + error)
  }).always(function() {
    console.log("~Always complete.");
  })

})
