
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
