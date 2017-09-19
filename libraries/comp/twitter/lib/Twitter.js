const Entity = require('kevoree-entities');
const Twitter = require('twitter');

/**
 * Tweets input messages and streams Tweets based on hashtags (comma-separated)
 *
 * @type {Twitter}
 */
module.exports = Entity.AbstractComponent.extend({
  toString: 'Twitter',
  tdef_version: 1,

  dic_consumer_key:        { optional: false },
  dic_consumer_secret:     { optional: false },
  dic_access_token_key:    {},
  dic_access_token_secret: {},
  dic_bearer_token:        {},
  dic_hashtags:            {},

  /**
   * Called when your component starts
   * @param {Function}     done call this when you are done starting
   *                            done(): all good
   *                            done(error): something went wrong
   */
  start(done) {
    this.client = new Twitter({
      consumer_key:        this.dictionary.getString('consumer_key'),
      consumer_secret:     this.dictionary.getString('consumer_secret'),
      access_token_key:    this.dictionary.getString('access_token_key'),
      access_token_secret: this.dictionary.getString('access_token_secret'),
      bearer_token:        this.dictionary.getString('bearer_token')
    });
    this.log.debug('started');
    done();
  },

  /**
   * Called when your component stops
   * @param {Function}     done call this when you are done stopping
   *                            done(): all good
   *                            done(error): something went wrong
   */
  stop(done) {
    this.log.debug('stopped');
    done();
  },

  /**
   * Called when any of the dictionary parameters has changed.
   * If multiple params changed, this method will only be called once.
   *
   * @param {Function}     done call this when you are done updating
   */
  update(done) {
    this.stop((err) => {
      if (err) {
        done(err);
      } else {
        this.start(done);
      }
    });
  },

  /**
   * Called each time a message is received by this component
   *
   * @param {String}       msg input message
   */
  in_tweet(msg) {
    if (this.client) {
      this.client.post('statuses/update', { status: msg }, (err, res) => {
        if (err) {
          if (res.request) {
            this.log.error('unable to tweet ('+err.message+', request='+res.request+', message='+res.error+')');
          } else {
            res.errors.forEach((error) => {
              this.log.error('unable to tweet (code='+error.code+', message='+error.message+')');
            });
          }
        } else {
          this.log.debug('just tweeted: ' + msg);
        }
      });
    }
  }
});
