

from django.db import migrations, models

def populate_tag_values(apps, schema_editor):
    Tag = apps.get_model('category', 'Tag')
    TagGroup = apps.get_model('category', 'TagGroup')
    for tag in Tag.objects.all():
        group = TagGroup.objects.get(id=tag.tag_group_id)
        tag.value = f"{group.name.lower()}_{tag.name.lower().replace(' ', '_')}"
        tag.save()

class Migration(migrations.Migration):

    dependencies = [
        ('category', '0003_alter_tag_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='tag',
            name='value',
            field=models.CharField(max_length=100, default=''),
            preserve_default=False,
        ),
        migrations.RunPython(populate_tag_values),
    ]
