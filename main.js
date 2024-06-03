// document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';


if ((description.length == 0) || (assignedTo.length==0)){
  alert("please fill all fields with data");
  document.getElementById('add-issue').setAttribute("data-toggle","modal");
  document.getElementById('add-issue').setAttribute("data-target", "#emptyField");

}
else{
  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  // e.preventDefault();
}
}


const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  currentIssue.description =`<strike>${currentIssue.description}</strike>`
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}


const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => ((issue.id) != id ))
  localStorage.removeItem('issue');
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}
 



// for onload webpage
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>


                              <a href="#" onclick="closeIssue(${id})" class="btn  btn-warning "> Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                            
                              </div>`;
  }
}


// similer or alternative code for 72 and 71 line code
// <button onclick ="closeIssue(${id})" class="btn btn-warning">Close</button>
// <button onclick="deleteIssue(${id})" class="btn btn-danger">Delete</button>