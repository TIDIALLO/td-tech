module.exports = {
  apps: [
    {
      name: 'synap6ia',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/synap6ia',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
      error_file: '/var/www/synap6ia/logs/pm2-error.log',
      out_file: '/var/www/synap6ia/logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
  ],
};
