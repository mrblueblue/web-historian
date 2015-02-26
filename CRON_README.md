<h1>Using CRON with Web Historian</h1>

<h2>Edit Cron file</h2>
<pre>
  crontab -e
</pre>
<p>Enters file and allows you to edit</p>

<h2>Specify a Cron job</h2>
<ul>
<li>Interval  */1 * * * * </li>
<li>Command /Users/student/.nvm/v0.10.26/bin/node</li>
<li>File /Users/student/2015-02-web-historian/workers/htmlfetcher.js</li>
</ul>

<h2>View Cron Job from Terminal</h2>
<pre>
>>> crontab -l
*/1 * * * * /Users/student/.nvm/v0.10.26/bin/node /Users/student/2015-02-web-historian/workers/htmlfetcher.js
</pre>
