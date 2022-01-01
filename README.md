# magnus-apeye

... it's supposed to be a pun.

## Archive of The Archive

This project is intended to provide a simple API for accessing, searching, and filtering Magnus Archives episodes in textual form.

## Considerations

Episode transcripts, metadata, and markdown are from [Snarp](https://github.com/Snarp)'s [magnus_archives_transcripts](https://github.com/Snarp/magnus_archives_transcripts). For human-eyeball reading of transcripts, [their site](https://snarp.github.io/magnus_archives_transcripts/) is a _far_ superior resource. My goal is to build something that provides the transcripts in a simple JSON format that can be easily read by applications that might do creative things with the contents (like advanced searching, as a straightforward example).

This is very in-progress and I'd love any input you might have - feel free to open issues or PRs if you've found yourself here with opinions on things. Currently the episodes in the database don't reflect the full metadata, and the markdown is converted to HTML strings for ease of use in a broader variety of settings. For full details about episodes please consult the markdown files in `assets`. Many or most links to original transcript sources are broken, so my hope is to track these down at some point and update the model-building to reflect the way the transcripts tend to be written from the get-go.

[The Magnus Archives](https://rustyquill.com/the-magnus-archives/) is a podcast written by [Jonathan Sims](https://rustyquill.com/the-magnus-archives/), directed by [Alexander J. Newall](http://rustyquill.com/alexander-j-newall/), and produced under the auspices of [Rusty Quill](https://rustyquill.com/about/). Episode content in the form of episode transcripts is [licensed](https://rustyquill.com/legals/) under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International license](https://creativecommons.org/licenses/by-nc-sa/4.0/), viewable at the provided link or in the `assets` directory.

The code here can be used under the GPL (see `LICENSE.md`), but the fiction falls under the license described above, which has different requirements and caveats.
