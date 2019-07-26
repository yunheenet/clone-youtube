import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const delCommentBtn = document.querySelectorAll(".jsDelComment");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const delComment = async id => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "DELETE",
    data: {
      id
    }
  });
  if (response.status === 200) {
    Array.from(document.querySelectorAll(".li-comment")).forEach(li => {
      if (li.childNodes[1].value === id) {
        li.remove();
        decreaseNumber();
      }
    });
  }
};

const addComment = (comment, commentId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  span.innerHTML = comment;
  button.value = commentId;
  button.innerHTML = "❌";
  button.addEventListener("click", evt => {
    evt.preventDefault();
    delComment(commentId);
  });
  li.classList.add("li-comment");
  li.appendChild(span);
  li.appendChild(button);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(comment, response.data);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  delCommentBtn.forEach(element => {
    element.addEventListener("click", evt => {
      evt.preventDefault();
      delComment(element.value);
    });
  });
}

if (addCommentForm) {
  init();
}
