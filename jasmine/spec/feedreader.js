/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        // each feeds have URL start with http|https
        it('have URLs', function () {
            for (var feed in allFeeds) {
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].url.length).not.toBe(0);
                expect(allFeeds[feed].url).toMatch(/^(http|https):\/\//);
            }
        });

        /* test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names', function () {
            for (var i in allFeeds) {
                expect(allFeeds[i].name).toBeDefined();
                expect(typeof allFeeds[i].name).toBe('string');
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

    });


    /* Write a new test suite named "The menu" */

    describe('The menu', function () {

        var hiddenMenu = $('body').hasClass('menu-hidden');

        it('body has "menu-hidden" by default', function () {
            expect(hiddenMenu).toEqual(true);
        });

        it('on click changes menu visibility', function () {
            var menuIcon = $('.menu-icon-link');

            menuIcon.click();
            expect(hiddenMenu).toEqual(false);

            menuIcon.click();
            expect(hiddenMenu).toEqual(true);
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe("Initial Entries", function () {

        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        // Make sure each (.feed .entry-link) element has valid link
        it("feed container has at least 1 entry and has a link starting with http|https ", function (done) {
            var entries = $('.entry').length;

            expect(entries).toBeGreaterThan(0);
            for (var i = 0; i < entries; i++) {
                expect(entries[i].href).toMatch(/^(http|https):\/\//);
            }
            done();
        });

    });

    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    /* TODO: Write a new test suite named "New Feed Selection" */


    describe('New Feed Selection', function () {
        var FirstFeed;
        var SecondFeed;
        
        beforeEach(function (done) {
            loadFeed(0, function () {
                FirstFeed = $('.feed').html();
                loadFeed(1, function () {
                    done();
                });
            });
        });
       

        it('change feed content on menu select', function () {
            expect(FirstFeed).toBeDefined();
            SecondFeed = $('.feed').html();
            expect(SecondFeed).toBeDefined();
            expect(FirstFeed).not.toEqual(SecondFeed);
        });
    });

}());
