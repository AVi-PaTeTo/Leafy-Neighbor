from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False, null=False)

    def __str__(self):
        return self.name
    

    
class TagGroup(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return self.name
    
class Tag(models.Model):
    tag_group = models.ForeignKey(TagGroup, on_delete=models.CASCADE, related_name='tags')
    name = models.CharField(max_length=100, blank=False, null=False)
    slug = models.SlugField(max_length=120, unique=True)
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            raw_slug = f"{self.tag_group.name.replace(' ','_')}_{self.name}"
            self.slug = slugify(raw_slug)
        super().save(*args, **kwargs)