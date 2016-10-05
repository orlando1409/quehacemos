# Prototype: PubSub-Cache #

This prototype will prove that postgresql server can be used as a broadcast hub
to allow connected nodes to exchange messages between server and other nodes in
order to keep local "app" caches up-to-date without (necessarily) having to 
make a request to the postgresql server.

Testing will require separate vagrant environments for each participating node
server (at least 2) and, of course, the postgresql vagrant environment.

We'll need to configure the nodes with endpoints that accept new data, trigger-
ing a NOTIFY from Postgres which updates caches of LISTENing nodes.

- vagrant-node1
- vagrant-node2
- vagrant-pg

