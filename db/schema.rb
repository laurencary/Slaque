# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_20_203659) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channel_subscriptions", force: :cascade do |t|
    t.bigint "workspace_user_id", null: false
    t.bigint "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_channel_subscriptions_on_channel_id"
    t.index ["workspace_user_id"], name: "index_channel_subscriptions_on_workspace_user_id"
  end

  create_table "channels", force: :cascade do |t|
    t.bigint "owner_id", null: false
    t.bigint "workspace_id", null: false
    t.string "name", null: false
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_channels_on_owner_id"
    t.index ["workspace_id", "name"], name: "index_channels_on_workspace_id_and_name"
    t.index ["workspace_id"], name: "index_channels_on_workspace_id"
  end

  create_table "direct_message_subscriptions", force: :cascade do |t|
    t.bigint "workspace_user_id", null: false
    t.bigint "direct_message_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["direct_message_id"], name: "index_direct_message_subscriptions_on_direct_message_id"
    t.index ["workspace_user_id"], name: "index_direct_message_subscriptions_on_workspace_user_id"
  end

  create_table "direct_messages", force: :cascade do |t|
    t.bigint "workspace_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workspace_id"], name: "index_direct_messages_on_workspace_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "workspace_author_id", null: false
    t.text "content", null: false
    t.boolean "edited", default: false, null: false
    t.jsonb "read_by_workspace_users", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "messageable_type"
    t.bigint "messageable_id"
    t.index ["messageable_type", "messageable_id"], name: "index_messages_on_messageable"
    t.index ["workspace_author_id"], name: "index_messages_on_workspace_author_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "workspace_user_subscriptions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "workspace_id", null: false
    t.string "full_name", null: false
    t.string "display_name"
    t.string "title"
    t.string "pronunciation"
    t.string "time_zone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_workspace_user_subscriptions_on_user_id"
    t.index ["workspace_id"], name: "index_workspace_user_subscriptions_on_workspace_id"
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "name"
    t.bigint "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_workspaces_on_name", unique: true
    t.index ["owner_id"], name: "index_workspaces_on_owner_id"
  end

  add_foreign_key "channel_subscriptions", "channels"
  add_foreign_key "channel_subscriptions", "workspace_user_subscriptions", column: "workspace_user_id"
  add_foreign_key "channels", "users", column: "owner_id"
  add_foreign_key "channels", "workspaces"
  add_foreign_key "direct_message_subscriptions", "direct_messages"
  add_foreign_key "direct_message_subscriptions", "workspace_user_subscriptions", column: "workspace_user_id"
  add_foreign_key "direct_messages", "workspaces"
  add_foreign_key "messages", "workspace_user_subscriptions", column: "workspace_author_id"
  add_foreign_key "workspace_user_subscriptions", "users"
  add_foreign_key "workspace_user_subscriptions", "workspaces"
  add_foreign_key "workspaces", "users", column: "owner_id"
end
