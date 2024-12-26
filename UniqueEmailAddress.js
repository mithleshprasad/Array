//Example 1:

//Input: emails = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]
//Output: 2
//Explanation: "testemail@leetcode.com" and "testemail@lee.tcode.com" actually receive mails.

/**
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function(emails) {
const arr1 = new Array();
for(let i=0;i<emails.length;i++){
    let [local,domain]= emails[i].split('@');
    local= local.split('+')[0];
    local= local.replace(/\./g,'');
    let newEmail= local + '@' + domain
    
    if(!arr1.includes(newEmail)){

    arr1.push(newEmail);
    }

}
console.log(arr1.length)
return arr1.length;
};
