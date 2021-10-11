'use strict';

const createCommentForm = () => {

	if(document.body.classList.contains('post-page')) {
			const commentForm = document.querySelector('.comment-form'),
			commentFormUserName = document.querySelector('.comment-form-user-name'),
			commentFormUserEmaile = document.querySelector('.comment-form-user-email'),
			commentFormText = document.querySelector('.comment-form-text'),
			submitCommentForm = document.querySelector('.submit-commrnt-form'),
			replyBtnCollection = document.querySelectorAll('.reply-btn'),
			commentsList = document.querySelector('.comments-list');
		let reply = false;
		let	parentCommentItem;

		const replyBtnEventsForCreateSubComment = item => {
			item.addEventListener('click', (event) => {
				event.preventDefault();
				commentFormUserName.focus();
				parentCommentItem = item.closest('.comment-list-item');
				reply = true;
			});
		};

		const createCommentItem = (commentContent, userName) => {
			const commentItem = document.createElement('li'),
				commentWrapper = document.createElement('div'),
				userPhotoBlock = document.createElement('div'),
				userPhoto = document.createElement('img'),
				comment = document.createElement('div'),
				commentUserNameDateBlock = document.createElement('div'),
				commentUserName = document.createElement('h5'),
				commentDate = document.createElement('span'),
				commentText = document.createElement('p'),
				replyBtn = document.createElement('button');

			commentItem.classList.add('comment-list-item');
			commentWrapper.classList.add('comment-wrapper');
			userPhotoBlock.classList.add('user-photo');
			comment.classList.add('comment');
			commentUserNameDateBlock.classList.add('comment-user-name-date-block');
			commentUserName.classList.add('comment-user-name');
			commentDate.classList.add('comment-date');
			commentText.classList.add('comment-text');
			replyBtn.classList.add('reply-btn');

			userPhoto.src = './src/img/Default-avatar.png';
			replyBtn.textContent = 'Reply';
	
			commentItem.append(commentWrapper);
			commentWrapper.append(userPhotoBlock);
			userPhotoBlock.append(userPhoto);
			commentWrapper.append(comment);
			comment.append(commentUserNameDateBlock);
			commentUserNameDateBlock.append(commentUserName);
			commentUserNameDateBlock.append(commentDate);
			comment.append(commentText);
			comment.append(replyBtn);

			commentText.textContent = commentContent; 
			commentUserName.textContent = userName;
		
			const date = new Date();
			const options = {
				year: 'numeric',
  				month: 'numeric',
  				day: 'numeric'
			};

			commentDate.textContent = date.toLocaleString("ru", options);
			replyBtnEventsForCreateSubComment(replyBtn);

			return commentItem;
		};

		const createSubCommentList = ()=> {
			const subList = document.createElement('ul');
			subList.classList.add('comments-sub-list');
			return subList;
		};

		replyBtnCollection.forEach(item => {
			replyBtnEventsForCreateSubComment(item);
		});

		submitCommentForm.addEventListener('click', event => {
			event.preventDefault();
			commentFormText.value.trim();
			commentFormUserName.value.trim();
			if(commentFormText.value !== '' && commentFormUserName.value !== '') {
				if(reply) {
					const subList = createSubCommentList();
					parentCommentItem.append(subList);
					subList.append(createCommentItem(commentFormText.value, commentFormUserName.value));
					reply = false;
				}else {
					commentsList.append(createCommentItem(commentFormText.value, commentFormUserName.value));
				}
				commentFormText.value = '';
			}
		});
	}
};

export default createCommentForm;
