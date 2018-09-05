!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t(e.threePathfinding={})}(this,function(e){var t=function(){};t.computeCentroids=function(e){var t,n,r;for(t=0,n=e.faces.length;t<n;t++)(r=e.faces[t]).centroid=new THREE.Vector3(0,0,0),r.centroid.add(e.vertices[r.a]),r.centroid.add(e.vertices[r.b]),r.centroid.add(e.vertices[r.c]),r.centroid.divideScalar(3)},t.roundNumber=function(e,t){return Number(e.toFixed(t))},t.sample=function(e){return e[Math.floor(Math.random()*e.length)]},t.mergeVertexIds=function(e,t){var n=[];if(e.forEach(function(e){t.indexOf(e)>=0&&n.push(e)}),n.length<2)return[];n.includes(e[0])&&n.includes(e[e.length-1])&&e.push(e.shift()),n.includes(t[0])&&n.includes(t[t.length-1])&&t.push(t.shift()),n=[],e.forEach(function(e){t.includes(e)&&n.push(e)});for(var r=n[1],o=n[0],i=e.slice();i[0]!==r;)i.push(i.shift());for(var s=0,u=t.slice();u[0]!==o;)if(u.push(u.shift()),s++>10)throw new Error("Unexpected state");return u.shift(),u.pop(),i=i.concat(u)},t.setPolygonCentroid=function(e,t){var n=new THREE.Vector3,r=t.vertices;e.vertexIds.forEach(function(e){n.add(r[e])}),n.divideScalar(e.vertexIds.length),e.centroid.copy(n)},t.cleanPolygon=function(e,t){for(var n=[],r=t.vertices,o=0;o<e.vertexIds.length;o++){var i,s,u,c=r[e.vertexIds[o]];0===o?(i=e.vertexIds[1],s=e.vertexIds[e.vertexIds.length-1]):o===e.vertexIds.length-1?(i=e.vertexIds[0],s=e.vertexIds[e.vertexIds.length-2]):(i=e.vertexIds[o+1],s=e.vertexIds[o-1]),u=r[s];var h=r[i].clone().sub(c),a=u.clone().sub(c),d=h.angleTo(a);if(d>Math.PI-.01&&d<Math.PI+.01){var f=[];e.neighbours.forEach(function(t){t.vertexIds.includes(e.vertexIds[o])||f.push(t)}),e.neighbours=f}else n.push(e.vertexIds[o])}e.vertexIds=n,this.setPolygonCentroid(e,t)},t.isConvex=function(e,t){var n=t.vertices;if(e.vertexIds.length<3)return!1;for(var r=!0,o=[],i=0;i<e.vertexIds.length;i++){var s,u,c=n[e.vertexIds[i]];0===i?(s=n[e.vertexIds[1]],u=n[e.vertexIds[e.vertexIds.length-1]]):i===e.vertexIds.length-1?(s=n[e.vertexIds[0]],u=n[e.vertexIds[e.vertexIds.length-2]]):(s=n[e.vertexIds[i+1]],u=n[e.vertexIds[i-1]]);var h=s.clone().sub(c),a=u.clone().sub(c),d=h.angleTo(a);if(d===Math.PI||0===d)return!1;var f=h.cross(a).y;o.push(f)}return o.forEach(function(e){0===e&&(r=!1)}),o.forEach(o[0]>0?function(e){e<0&&(r=!1)}:function(e){e>0&&(r=!1)}),r},t.distanceToSquared=function(e,t){var n=e.x-t.x,r=e.y-t.y,o=e.z-t.z;return n*n+r*r+o*o},t.isPointInPoly=function(e,t){for(var n=!1,r=-1,o=e.length,i=o-1;++r<o;i=r)(e[r].z<=t.z&&t.z<e[i].z||e[i].z<=t.z&&t.z<e[r].z)&&t.x<(e[i].x-e[r].x)*(t.z-e[r].z)/(e[i].z-e[r].z)+e[r].x&&(n=!n);return n},t.isVectorInPolygon=function(e,t,n){var r=1e5,o=-1e5,i=[];return t.vertexIds.forEach(function(e){r=Math.min(n[e].y,r),o=Math.max(n[e].y,o),i.push(n[e])}),!!(e.y<o+.5&&e.y>r-.5&&this.isPointInPoly(i,e))},t.triarea2=function(e,t,n){return(n.x-e.x)*(t.z-e.z)-(t.x-e.x)*(n.z-e.z)},t.vequal=function(e,t){return this.distanceToSquared(e,t)<1e-5};var n=function(e){this.content=[],this.scoreFunction=e};n.prototype.push=function(e){this.content.push(e),this.sinkDown(this.content.length-1)},n.prototype.pop=function(){var e=this.content[0],t=this.content.pop();return this.content.length>0&&(this.content[0]=t,this.bubbleUp(0)),e},n.prototype.remove=function(e){var t=this.content.indexOf(e),n=this.content.pop();t!==this.content.length-1&&(this.content[t]=n,this.scoreFunction(n)<this.scoreFunction(e)?this.sinkDown(t):this.bubbleUp(t))},n.prototype.size=function(){return this.content.length},n.prototype.rescoreElement=function(e){this.sinkDown(this.content.indexOf(e))},n.prototype.sinkDown=function(e){for(var t=this.content[e];e>0;){var n=(e+1>>1)-1,r=this.content[n];if(!(this.scoreFunction(t)<this.scoreFunction(r)))break;this.content[n]=t,this.content[e]=r,e=n}},n.prototype.bubbleUp=function(e){for(var t=this.content.length,n=this.content[e],r=this.scoreFunction(n);;){var o=e+1<<1,i=o-1,s=null,u=void 0;if(i<t)(u=this.scoreFunction(this.content[i]))<r&&(s=i);if(o<t)this.scoreFunction(this.content[o])<(null===s?r:u)&&(s=o);if(null===s)break;this.content[e]=this.content[s],this.content[s]=n,e=s}};var r=function(){};r.init=function(e){for(var t=0;t<e.length;t++){var n=e[t];n.f=0,n.g=0,n.h=0,n.cost=1,n.visited=!1,n.closed=!1,n.parent=null}},r.cleanUp=function(e){for(var t=0;t<e.length;t++){var n=e[t];delete n.f,delete n.g,delete n.h,delete n.cost,delete n.visited,delete n.closed,delete n.parent}},r.heap=function(){return new n(function(e){return e.f})},r.search=function(e,t,n){this.init(e);var r=this.heap();for(r.push(t);r.size()>0;){var o=r.pop();if(o===n){for(var i=o,s=[];i.parent;)s.push(i),i=i.parent;return this.cleanUp(s),s.reverse()}o.closed=!0;for(var u=this.neighbours(e,o),c=0,h=u.length;c<h;c++){var a=u[c];if(!a.closed){var d=o.g+a.cost,f=a.visited;if(!f||d<a.g){if(a.visited=!0,a.parent=o,!a.centroid||!n.centroid)throw new Error("Unexpected state");a.h=a.h||this.heuristic(a.centroid,n.centroid),a.g=d,a.f=a.g+a.h,f?r.rescoreElement(a):r.push(a)}}}}return[]},r.heuristic=function(e,n){return t.distanceToSquared(e,n)},r.neighbours=function(e,t){for(var n=[],r=0;r<t.neighbours.length;r++)n.push(e[t.neighbours[r]]);return n};var o=1,i=function(){};i.buildZone=function(e){var n=this,r=this._buildNavigationMesh(e),o={};r.vertices.forEach(function(e){e.x=t.roundNumber(e.x,2),e.y=t.roundNumber(e.y,2),e.z=t.roundNumber(e.z,2)}),o.vertices=r.vertices;var i=this._buildPolygonGroups(r);o.groups=[];var s=function(e,t){for(var n=0;n<e.length;n++)if(t===e[n])return n};return i.forEach(function(e){var r=[];e.forEach(function(o){var i=o.neighbours.map(function(t){return s(e,t)}),u=o.neighbours.map(function(e){return n._getSharedVerticesInOrder(o,e)});o.centroid.x=t.roundNumber(o.centroid.x,2),o.centroid.y=t.roundNumber(o.centroid.y,2),o.centroid.z=t.roundNumber(o.centroid.z,2),r.push({id:s(e,o),neighbours:i,vertexIds:o.vertexIds,centroid:o.centroid,portals:u})}),o.groups.push(r)}),o},i._buildNavigationMesh=function(e){return t.computeCentroids(e),e.mergeVertices(),this._buildPolygonsFromGeometry(e)},i._buildPolygonGroups=function(e){var t=[],n=0,r=function(e){e.neighbours.forEach(function(t){void 0===t.group&&(t.group=e.group,r(t))})};return e.polygons.forEach(function(e){void 0===e.group&&(e.group=n++,r(e)),t[e.group]||(t[e.group]=[]),t[e.group].push(e)}),t},i._buildPolygonNeighbours=function(e,t,n){var r=new Set,o=n.get(e.vertexIds[0]),i=n.get(e.vertexIds[1]),s=n.get(e.vertexIds[2]);o.forEach(function(e){(i.has(e)||s.has(e))&&r.add(t.polygons[e])}),i.forEach(function(e){s.has(e)&&r.add(t.polygons[e])}),e.neighbours=Array.from(r)},i._buildPolygonsFromGeometry=function(e){for(var t=this,n=[],r=e.vertices,i=e.faceVertexUvs,s=new Map,u=0;u<r.length;u++)s.set(u,new Set);e.faces.forEach(function(e){n.push({id:o++,vertexIds:[e.a,e.b,e.c],centroid:e.centroid,normal:e.normal,neighbours:[]}),s.get(e.a).add(n.length-1),s.get(e.b).add(n.length-1),s.get(e.c).add(n.length-1)});var c={polygons:n,vertices:r,faceVertexUvs:i};return n.forEach(function(e){t._buildPolygonNeighbours(e,c,s)}),c},i._getSharedVerticesInOrder=function(e,t){var n=e.vertexIds,r=t.vertexIds,o=new Set;if(n.forEach(function(e){r.includes(e)&&o.add(e)}),o.size<2)return[];o.has(n[0])&&o.has(n[n.length-1])&&n.push(n.shift()),o.has(r[0])&&o.has(r[r.length-1])&&r.push(r.shift());var i=[];return n.forEach(function(e){r.includes(e)&&i.push(e)}),i};var s=function(){this.portals=[]};s.prototype.push=function(e,t){void 0===t&&(t=e),this.portals.push({left:e,right:t})},s.prototype.stringPull=function(){var e,n,r,o=this.portals,i=[],s=0,u=0,c=0;n=o[0].left,r=o[0].right,i.push(e=o[0].left);for(var h=1;h<o.length;h++){var a=o[h].left,d=o[h].right;if(t.triarea2(e,r,d)<=0){if(!(t.vequal(e,r)||t.triarea2(e,n,d)>0)){i.push(n),n=e=n,r=e,u=s=u,c=s,h=s;continue}r=d,c=h}if(t.triarea2(e,n,a)>=0){if(!(t.vequal(e,n)||t.triarea2(e,r,a)<0)){i.push(r),n=e=r,r=e,u=s=c,c=s,h=s;continue}n=a,u=h}}return 0!==i.length&&t.vequal(i[i.length-1],o[o.length-1].left)||i.push(o[o.length-1].left),this.path=i,i};var u,c,h,a,d,f,l=function(){this.zones={}};l.createZone=function(e){return e.isGeometry?console.warn("[three-pathfinding]: Use THREE.BufferGeometry, not THREE.Geometry, to create zone."):e=(new THREE.Geometry).fromBufferGeometry(e),i.buildZone(e)},l.prototype.setZoneData=function(e,t){this.zones[e]=t},l.prototype.getGroup=function(e,n){if(!this.zones[e])return null;var r=null,o=Math.pow(50,2);return this.zones[e].groups.forEach(function(e,i){e.forEach(function(e){var s=t.distanceToSquared(e.centroid,n);s<o&&(r=i,o=s)})}),r},l.prototype.getRandomNode=function(e,n,r,o){if(!this.zones[e])return new THREE.Vector3;r=r||null,o=o||0;var i=[];return this.zones[e].groups[n].forEach(function(e){r&&o?t.distanceToSquared(r,e.centroid)<o*o&&i.push(e.centroid):i.push(e.centroid)}),t.sample(i)||new THREE.Vector3},l.prototype.getClosestNode=function(e,n,r,o){void 0===o&&(o=!1);var i=this.zones[n].vertices,s=null,u=Infinity;return this.zones[n].groups[r].forEach(function(n){var r=t.distanceToSquared(n.centroid,e);r<u&&(!o||t.isVectorInPolygon(e,n,i))&&(s=n,u=r)}),s},l.prototype.findPath=function(e,t,n,o){var i=this.zones[n].groups[o],u=this.zones[n].vertices,c=this.getClosestNode(e,n,o),h=this.getClosestNode(t,n,o,!0);if(!c||!h)return null;var a=r.search(i,c,h),d=function(e,t){for(var n=0;n<e.neighbours.length;n++)if(e.neighbours[n]===t.id)return e.portals[n]},f=new s;f.push(e);for(var l=0;l<a.length;l++){var v=a[l+1];if(v){var p=d(a[l],v);f.push(u[p[0]],u[p[1]])}}f.push(t),f.stringPull();var g=f.path.map(function(e){return new THREE.Vector3(e.x,e.y,e.z)});return g.shift(),g},l.prototype.clampStep=(h=new THREE.Vector3,a=new THREE.Plane,d=new THREE.Triangle,f=new THREE.Vector3,function(e,t,n,r,o,i){var s=this.zones[r].vertices,l=this.zones[r].groups[o],v=[n],p={};p[n.id]=0,u=void 0,f.set(0,0,0),c=Infinity,a.setFromCoplanarPoints(s[n.vertexIds[0]],s[n.vertexIds[1]],s[n.vertexIds[2]]),a.projectPoint(t,h),t.copy(h);for(var g=v.pop();g;g=v.pop()){d.set(s[g.vertexIds[0]],s[g.vertexIds[1]],s[g.vertexIds[2]]),d.closestPointToPoint(t,h),h.distanceToSquared(t)<c&&(u=g,f.copy(h),c=h.distanceToSquared(t));var x=p[g];if(!(x>2))for(var y=0;y<g.neighbours.length;y++){var I=l[g.neighbours[y]];I.id in p||(v.push(I),p[I.id]=x+1)}}return i.copy(f),u}),e.Pathfinding=l});
//# sourceMappingURL=three-pathfinding.umd.js.map