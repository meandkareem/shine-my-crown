const htmlTag = require('html-tag');

// This function helps transforming structures like:
//
// [{ tagName: 'meta', attributes: { name: 'description', content: 'foobar' } }]
//
// into proper HTML tags:
//
// <meta name="description" content="foobar" />

const toHtml = (tags) => (
  tags.map(({ tagName, attributes, content }) => (
    htmlTag(tagName, attributes, content)
  )).join("")
);

// Arguments that will receive the mapping function:
//
// * dato: lets you easily access any content stored in your DatoCMS
//   administrative area;
//
// * root: represents the root of your project, and exposes commands to
//   easily create local files/directories;
//
// * i18n: allows to switch the current locale to get back content in
//   alternative locales from the first argument.
//
// Read all the details here:
// https://github.com/datocms/js-datocms-client/blob/master/docs/dato-cli.md

module.exports = (dato, root, i18n) => {

  // Add to the existing Hugo config files some properties coming from data
  // stored on DatoCMS

  root.addToDataFile('site/config.toml', 'toml', {
      title: dato.site.globalSeo.siteName,
  });

  // Create a YAML data file to store global data about the site
  root.createDataFile('site/data/settings.yml', 'yaml', {
    name: dato.site.globalSeo.siteName,
    language: dato.site.locales[0],
    // iterate over all the `social_profile` item types
    socialProfiles: dato.socialProfiles.map(profile => {
      return {
        type: profile.profileType.toLowerCase().replace(/ +/, '-'),
        url: profile.url,
      };
    }),
    faviconMetaTags: toHtml(dato.site.faviconMetaTags)
  });

  // Create a markdown file with content coming from the `about_page` item
  // type stored in DatoCMS
  root.createPost('site/content/about.md', 'yaml', {
    frontmatter: {
      title: dato.aboutPage.title,
      subtitle: dato.aboutPage.subtitle,
      photo: dato.aboutPage.photo.url({ w: 800, fm: 'jpg', auto: 'compress' }),
      seoMetaTags: toHtml(dato.aboutPage.seoMetaTags),
      menu: { main: { weight: 100 } }
    },
    content: dato.aboutPage.bio
  });

  // Create a `work` directory (or empty it if already exists)...
  root.directory('site/content/post', dir => {
    // ...and for each of the works stored online...
    dato.posts.forEach((post, index) => {
      // ...create a markdown file with all the metadata in the frontmatter
      dir.createPost(`${post.slug}.md`, 'yaml', {
        frontmatter: {
          title: post.title,
          cover: post.cover.url({ w: 450, fm: 'jpg', auto: 'compress' }),
          summary: post.summary,
          seoMetaTags: toHtml(post.seoMetaTags),
          categories: post.category.map(cat => cat.name),
          // extraImages: post.gallery.map(item =>
          //   item.url({ h: 300, fm: 'jpg', auto: 'compress' })
          // ),
          weight: index,
        },
        content: post.body
      });
    });
  });
};
