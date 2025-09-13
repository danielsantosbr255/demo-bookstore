import http from 'http';
import url from 'url';

class App {
  constructor() {
    this.routes = [];
  }

  use(path, handler, method = 'GET') {
    this.routes.push({ path, method, handler });
  }

  get(path, handler) {
    this.use(path, handler, 'GET');
  }

  post(path, handler) {
    this.use(path, handler, 'POST');
  }

  put(path, handler) {
    this.use(path, handler, 'PUT');
  }

  delete(path, handler) {
    this.use(path, handler, 'DELETE');
  }

  listen(port, callback) {
    const server = http.createServer(async (req, res) => {
      const parsedUrl = url.parse(req.url, true);

      res.status = function (code) {
        res.statusCode = code;
        return res;
      };

      res.json = function (data) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      };

      res.send = function (data) {
        res.end(data);
      };

      const route = this.routes.find(r => r.path === parsedUrl.pathname && r.method === req.method);

      if (route) {
        let body = '';
        req.on('data', chunk => (body += chunk.toString()));
        req.on('end', () => {
          try {
            req.body = body ? JSON.parse(body) : {};
          } catch {
            req.body = {};
          }
          req.query = parsedUrl.query;

          route.handler(req, res);
        });
      } else {
        res.status(404).json({ error: 'Not Found' });
      }
    });

    server.listen(port, callback);
  }
}

export default App;
