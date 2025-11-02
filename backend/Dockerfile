# Use an official Python image
FROM python:3.11-slim

# Set work directory
WORKDIR /app

# Prevent Python from writing pyc files and buffering logs
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose the port Render will use
EXPOSE 8000

# Run migrations, collectstatic, and start Gunicorn
CMD sh -c "python manage.py migrate && \
           python manage.py collectstatic --noinput && \
           python manage.py shell < create_superuser.py && \
           gunicorn config.wsgi:application --bind 0.0.0.0:8000"

