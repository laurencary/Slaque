json.extract! message, :id, :workspace_author_id, :content, :edited
json.createdAt message.get_display_time
json.author_name message.workspace_author.full_name
json.unread true
