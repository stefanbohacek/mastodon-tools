import loadAccountInfo from './loadAccountInfo.js';
class Hovercard {
    constructor(options) {
        this.options = options;
        this.addHovercard = this.addHovercard.bind(this);
    }
    
    removeHovercards(target){
        [...document.getElementsByClassName('sbmt-account-info')].forEach(el => {
            el.parentNode.removeChild(el);
        });
    }

    addHovercard(target){
        if (target.classList.contains('sbmt-has-card')){ return };
        // target.classList.add('sbmt-pe-none');
        let account, domain;
        const href = target.getAttribute('href');
        
        if (href.startsWith('http')){
            const url = new URL(href);
            domain = url.hostname;
            let user = url.pathname.substring(1);
            account = `${user}@${domain}`
        } else {
            account = target.getAttribute('href').substring(1);
        }

        loadAccountInfo(account).then(results => {
            if (results && (results.display_name || results.username)){
                const card = document.createElement('div');
                card.classList.add('sbmt-card', 'sbmt-hovercard', 'sbmt-account-info');
            
                // results.account
                // results.display_name
                // results.avatar_static
                // results.note
                // results.fields
                // results.followers_count
                // results.following_count
                // results.header_static
                // results.bot
                // results.locked
                // results.url
           
                const followersHTML = Number.isInteger(results.followers_count) ? `<span class="sbmt-followers-following">${results.following_count.toLocaleString()} following | ${results.followers_count.toLocaleString()} followers<span>` : '';
    
                let labelsHTML = '<span class="sbmt-account-labels">';
                let isFollower = false, isFollowing = false;

                if (this.options){
                    if (this.options.followers && this.options.followers.map(account => `@${account.acc}`).includes(results.account)){
                        isFollower = true;
                    }
                    
                    if (this.options.followedAccounts && this.options.followedAccounts.map(account => `@${account.acc}`).includes(results.account)){
                        isFollowing = true;
                    }
                }

                if (isFollower && isFollowing){
                    labelsHTML += '<span class="smbt-follower-status">mutual follow</span>';
                } else {
                    if (isFollower){
                        labelsHTML += '<span class="smbt-follower-status">follows you</span>';
                    }
                    if (isFollowing){
                        labelsHTML += `<span class="smbt-follower-status">you're following</span>`;
                    }
                }
             
                if (results.roles){
                    if (results.roles.includes('owner')){
                        labelsHTML += '<span title="Instance owner">👑</span>';
                    }
                }
                
                if (results.bot){
                    labelsHTML += '<span title="Automated account">🤖</span>';
                }

                if (results.locked){
                    labelsHTML += '<span title="Locked account">🔒</span>';
                }

                labelsHTML += '</span>';

                let profileImageHTML = '';

                if (results.avatar_static){
                    profileImageHTML = `<img width="60" heigh="60" class="sbmt-profile-img" src="${results.avatar_static}" />`;              
                }

    
                card.innerHTML = `
                <div class="sbmt-row">
                    <div class="sbmt-profile-img-wrapper sbmt-column">
                        <a href="/${results.account}" class="sbmt-profile-img-link">
                            ${profileImageHTML}
                        </a>
                    </div>
                    <div class="sbmt-account-details sbmt-column">
                        ${labelsHTML}
                        <a href="/${results.account}" class="sbmt-account-name-link">
                            <span class="sbmt-account-name">${results.display_name || results.username}</span>
                        </a>
                        <span class="sbmt-account-username">${results.account}</span>
                        <span class="sbmt-account-note">${results.note.replaceAll('u-url mention', 'u-url xmention')}</span>
                        ${followersHTML}
                    </div>
                </div>
                `;
                target.classList.add('sbmt-has-card');
                // target.prepend(card);  
                target.insertAdjacentHTML('afterend', card.outerHTML); 
            }
        });
    }
};

export default Hovercard;
