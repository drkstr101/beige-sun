import React from "react"
import _ from "lodash"

import { getData } from "../utils"
import BlogPostFeedItem from "./BlogPostFeedItem"

export default class BlogFeedItemFilter extends React.Component {
  render() {
    let section = _.get(this.props, "blog_feed_section", null)
    let section_author = _.get(this.props, "section_author", null)
    let section_category = _.get(this.props, "section_category", null)
    let section_tag = _.get(this.props, "section_tag", null)
    let post = _.get(this.props, "post_page", null)
    return section_author ? (
      _.get(post, "frontmatter.author", null) &&
        (() => {
          let post_author = getData(
            this.props.pageContext.site.data,
            _.get(post, "frontmatter.author", null)
          )
          return (
            post_author.id === _.get(section_author, "id", null) && (
              <BlogPostFeedItem
                {...this.props}
                blog_feed_section={section}
                post_page={post}
              />
            )
          )
        })()
    ) : section_category ? (
      _.map(_.get(post, "frontmatter.categories", null), (category, category_idx) => {
        let post_category = getData(this.props.pageContext.site.data, category)
        return (
          post_category.id === _.get(section_category, "id", null) && (
            <BlogPostFeedItem
              key={category_idx}
              {...this.props}
              blog_feed_section={section}
              post_page={post}
            />
          )
        )
      })
    ) : section_tag ? (
      _.map(_.get(post, "frontmatter.tags", null), (tag, tag_idx) => {
        let post_tag = getData(this.props.pageContext.site.data, tag)
        return (
          post_tag.id === _.get(section_tag, "id", null) && (
            <BlogPostFeedItem
              key={tag_idx}
              {...this.props}
              blog_feed_section={section}
              post_page={post}
            />
          )
        )
      })
    ) : (
      <BlogPostFeedItem {...this.props} blog_feed_section={section} post_page={post} />
    )
  }
}
