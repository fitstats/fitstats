<<<<<<< HEAD

<a name="v0.0.12"></a>
### v0.0.12 (2014-07-20)

#### Features
* Add accommodation to multifield submission for dashboard PUT requests

#### Bug Fixes
* Fixed: Dates submitted in batch forms would each create new mongodb documents
* Fixed: Pie graph would not update upon scraping mfp data
* Fixed: Email error notification on signin


<a name="v0.0.11"></a>
### v0.0.11 (2014-07-20)
=======
<a name="v0.1.0"></a>
### v0.1.0 (2014-07-20)
>>>>>>> 445331b8f59e0d3a76e300cd6064d97911676edb

#### Features
* Add MFP id to user schema and provide accessibility from dashboard
* Add ability to scrape directly without prompting user if MFPid is available
* Add ability to refresh and call and connect to any date requested in the url

#### Bug Fixes
* Refactored child controllers - parent controller organization
* Refactored of Dashboard controller - factory connections
* Improved nutrition field input submission


<a name="v0.0.10"></a>
### v0.0.10 (2014-07-19)

#### Features
* Redesign front page
* Redesign login page
* Redesign signup page
* Add MyFitnessPal ID field to signup form

#### Bug Fixes
* Fix font-awesome minification bug in grunt deploy script

#### Dependencies
* Add Google Chart dependency


<a name="v0.0.9"></a>
### v0.0.9 (2014-07-19)

#### Features
* Change database schema from embedded document to document reference type.



<a name="v0.0.8"></a>
### v0.0.8 (2014-07-18)

#### Features
* Added database feature

#### Bug Fixes
* change request data from seperate field to one day field successfully


<a name="v0.0.7"></a>
### v0.0.7 (2014-07-18)

#### Features
* Implemented MyFitnessPal Scraper (currently prompts user for ID, logs to console)

#### Organization
* Reorganized and refactored client CSS files

#### Bug Fixes
* Fix CSS layout and positioning bugs in Dashboard


<a name="v0.0.6"></a>

### v0.0.6 (2014-07-18)

#### Features
* Date of dashboard can be incremented or decremented, and data displayed updated accordingly.
* Added input show-hide animation for dashboard nutrition panel.
* Data GET request on page load is under the Parent controller only, and retrieves whole date's data object.

#### Bug Fixes
* Database stores raw data only.
* Dashboard's data filtering occurs only before presenting to user.


<a name="v0.0.5"></a>
### v0.0.5 (2014-07-17)

#### Bug Fixes
* Fix bug where Auth methods called before userData is retrieved from server
* Login and Signup pages correctly redirect to /dashboard
* Authentication Interceptor (on state change) works correctly now



<a name="v0.0.4"></a>
### v0.0.4 (2014-07-17)

#### Features
* Configured data routing cycle between view and server.
* GET requests initiated in dashboard controller, calls factory, submits get request, updates the controller upon success.
* PUT request invokes dashboard factory, factory connects to server and updates dashboard controller upon success.




<a name="v0.0.3"></a>
### v0.0.3 (2014-07-17)

#### Bug Fixes
* Navbar collapse button (on narrow window-size) works correctly
* Google Web Font (Cabin) works correctly
* Add dummy tests so Grunt build doesn't fail

#### Outstanding bugs
* Login redirect uses $timeout due to improper promise resolution causing state to change before user authentication check returns true
* Navbar .brand element is too wide




<a name="v0.0.2"></a>
### v0.0.2 (2014-07-14)


#### Features

* **App:** Add authentication-conditional navbar links
* **App:** Add authentication wall to private pages (dashboard and settings) (without OAuth strategies).

#### Outstanding bugs
* Login redirect uses $timeout due to improper promise resolution causing state to change before user authentication check returns true
* Navbar .brand element is too wide
* Navbar collapse button (on narrow window-size) drop-down menu doesn't work


<a name="v0.0.1"></a>
### v0.0.1 (2014-07-13)


#### Features

* **App:** Add Dashboard View and Edit of Navbar and Footer.


<a name="v0.0.0"></a>
### v0.0.0 (2014-07-13)


#### Features

* **App:** Add Initial Project Seed from [Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack/blob/master/CHANGELOG.md#v202-2014-07-02)
