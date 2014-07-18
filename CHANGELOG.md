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
