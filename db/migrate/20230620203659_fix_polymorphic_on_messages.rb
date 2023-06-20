class FixPolymorphicOnMessages < ActiveRecord::Migration[7.0]
  def change
    remove_column :messages, :messageable_id
    add_reference :messages, :messageable, polymorphic: true, index: true
  end
end
