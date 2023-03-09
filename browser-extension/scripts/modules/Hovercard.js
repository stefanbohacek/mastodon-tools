import loadAccountInfo from './loadAccountInfo.js';

class Hovercard {
    removeHovercards(target){
        [...document.getElementsByClassName('sbmt-account-info')].forEach(el => {
            el.parentNode.removeChild(el);
        });
    }
    
    addHovercard(target){
        if (target.classList.contains('sbmt-has-card')){ return };
        // target.classList.add('sbmt-pe-none');
        const account = target.getAttribute('href').substring(1);
    
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
           
                const followersHTML = Number.isInteger(results.followers_count) ? `<span class="sbmt-followers-following">${results.followers_count.toLocaleString()} followers | ${results.following_count.toLocaleString()} following<span>` : '';
    
                let labelsHTML = '';
    
                if (results.bot || results.locked){
                    labelsHTML = '<span class="sbmt-account-labels">';
                    
                    if (results.bot){
                        labelsHTML += '🤖';
                    }
    
                    if (results.locked){
                        labelsHTML += '🔒';
                    }
    
                    labelsHTML += '</span>';
                }
    
                card.innerHTML = `
                <div class="sbmt-row">
                    <div class="sbmt-profile-img-wrapper sbmt-column">
                        <img width="60" heigh="60" class="sbmt-profile-img" src="${results.avatar_static}" />
                    </div>
                    <div class="sbmt-account-details sbmt-column">
                        ${labelsHTML}
                        <span class="sbmt-account-name">${results.display_name || results.username}</span>
                        <span class="sbmt-account-username">${results.account}</span>
                        <span class="sbmt-account-note">${results.note}</span>
                        ${followersHTML}
                    </div>
                </div>
                `;
                target.classList.add('sbmt-has-card');
                target.prepend(card);  
            }

    
        });
      
    }

};

export default Hovercard;