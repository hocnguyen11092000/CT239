(function (jss) {
  var KruskalMST = function (G) {
    var V = G.V;
    var pq = new jss.MinPQ(function (e1, e2) {
      return e1.weight - e2.weight;
    });
    for (var v = 0; v < G.V; ++v) {
      var adj_v = G.adj(v);
      for (var i = 0; i < adj_v.length; ++i) {
        var e = adj_v[i];
        if (e.either() != v) {
          continue;
        }
        pq.enqueue(e);
      }
    }

    this.mst = [];

    var uf = new jss.QuickUnion(V);
    while (!pq.isEmpty() && this.mst.length < V - 1) {
      var e = pq.delMin();
      var v = e.either();
      var w = e.other(v);

      if (!uf.connected(v, w)) {
        uf.union(v, w);
        this.mst.push(e);
      }
    }
  };

  jss.KruskalMST = KruskalMST;
})(jsgraphs);