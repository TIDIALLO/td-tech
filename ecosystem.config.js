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
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pm2/synap6ia-error.log',
      out_file: '/var/log/pm2/synap6ia-out.log',
      log_file: '/var/log/pm2/synap6ia-combined.log',
      time: true,
    },
  ],
};
