(function ($hx_exports) { "use strict";
$hx_exports.milkshake = $hx_exports.milkshake || {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Space = $hx_exports.Space = function() { };
Space.__name__ = ["Space"];
Space.main = function() {
	var milkshake1 = milkshake.Milkshake.boot(new milkshake.Settings(milkshake.utils.Globals.SCREEN_WIDTH,milkshake.utils.Globals.SCREEN_HEIGHT));
	milkshake1.scenes.addScene(new scenes.TestScene());
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
};
var ValueType = { __ename__ : true, __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c;
		if((v instanceof Array) && v.__enum__ == null) c = Array; else c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var haxe = {};
haxe.StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.CallStack = function() { };
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe.CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	run: function() {
	}
	,__class__: haxe.Timer
};
haxe.TypeTools = function() { };
haxe.TypeTools.__name__ = ["haxe","TypeTools"];
haxe.TypeTools.getClassNames = function(value) {
	var result = new List();
	var valueClass;
	if(js.Boot.__instanceof(value,Class)) valueClass = value; else valueClass = Type.getClass(value);
	while(null != valueClass) {
		result.add(Type.getClassName(valueClass));
		valueClass = Type.getSuperClass(valueClass);
	}
	return result;
};
haxe.ds = {};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,__class__: haxe.ds.StringMap
};
haxe.exception = {};
haxe.exception.Exception = function(message,innerException,numberOfStackTraceShifts) {
	if(null == message) this.message = "Unknown exception"; else this.message = message;
	this.innerException = innerException;
	this.generateStackTrace(numberOfStackTraceShifts);
	this.stackTrace = this.stackTraceArray;
};
haxe.exception.Exception.__name__ = ["haxe","exception","Exception"];
haxe.exception.Exception.prototype = {
	generateStackTrace: function(numberOfStackTraceShifts) {
		this.stackTraceArray = haxe.CallStack.callStack().slice(numberOfStackTraceShifts + 1);
		var exceptionClass = Type.getClass(this);
		while(haxe.exception.Exception != exceptionClass) {
			this.stackTraceArray.shift();
			exceptionClass = Type.getSuperClass(exceptionClass);
		}
	}
	,get_baseException: function() {
		var result = this;
		while(null != result.innerException) result = result.innerException;
		return result;
	}
	,toString: function() {
		return this.message + haxe.CallStack.toString(this.stackTraceArray);
	}
	,__class__: haxe.exception.Exception
	,__properties__: {get_baseException:"get_baseException"}
};
haxe.exception.ArgumentNullException = function(argumentName,numberOfStackTraceShifts) {
	haxe.exception.Exception.call(this,"Argument " + argumentName + " must be non-null",null,numberOfStackTraceShifts);
};
haxe.exception.ArgumentNullException.__name__ = ["haxe","exception","ArgumentNullException"];
haxe.exception.ArgumentNullException.__super__ = haxe.exception.Exception;
haxe.exception.ArgumentNullException.prototype = $extend(haxe.exception.Exception.prototype,{
	__class__: haxe.exception.ArgumentNullException
});
var hsl = {};
hsl.haxe = {};
hsl.haxe.Bond = function() {
	this.halted = false;
};
hsl.haxe.Bond.__name__ = ["hsl","haxe","Bond"];
hsl.haxe.Bond.prototype = {
	destroy: function() {
	}
	,destroyOnUse: function() {
		this.willDestroyOnUse = true;
		return this;
	}
	,halt: function() {
		this.halted = true;
	}
	,resume: function() {
		this.halted = false;
	}
	,__class__: hsl.haxe.Bond
};
hsl.haxe.Signaler = function() { };
hsl.haxe.Signaler.__name__ = ["hsl","haxe","Signaler"];
hsl.haxe.Signaler.prototype = {
	__class__: hsl.haxe.Signaler
	,__properties__: {get_isListenedTo:"get_isListenedTo"}
};
hsl.haxe.DirectSignaler = function(subject,rejectNullData) {
	if(null == subject) throw new haxe.exception.ArgumentNullException("subject",1);
	this.subject = subject;
	this.rejectNullData = rejectNullData;
	this.sentinel = new hsl.haxe._DirectSignaler.SentinelBond();
};
hsl.haxe.DirectSignaler.__name__ = ["hsl","haxe","DirectSignaler"];
hsl.haxe.DirectSignaler.__interfaces__ = [hsl.haxe.Signaler];
hsl.haxe.DirectSignaler.prototype = {
	addBubblingTarget: function(value) {
		if(null == this.bubblingTargets) this.bubblingTargets = new List();
		this.bubblingTargets.add(value);
	}
	,addNotificationTarget: function(value) {
		if(null == this.notificationTargets) this.notificationTargets = new List();
		this.notificationTargets.add(value);
	}
	,bind: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.RegularBond(listener));
	}
	,bindAdvanced: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	}
	,bindVoid: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	}
	,bubble: function(data,origin) {
		if(null != this.bubblingTargets) {
			var $it0 = this.bubblingTargets.iterator();
			while( $it0.hasNext() ) {
				var bubblingTarget = $it0.next();
				bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 116, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
			}
		}
		if(null != this.notificationTargets) {
			var $it1 = this.notificationTargets.iterator();
			while( $it1.hasNext() ) {
				var notificationTarget = $it1.next();
				notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 121, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
			}
		}
	}
	,dispatch: function(data,origin,positionInformation) {
		if("dispatchNative" != positionInformation.methodName && "bubble" != positionInformation.methodName) this.verifyCaller(positionInformation);
		if(this.rejectNullData && null == data) throw new haxe.exception.Exception("Some data that was passed is null, but this signaler has been set to reject null data.",null,1);
		if(null == origin) origin = this.subject; else origin = origin;
		if(this.mostRecentPropagationUndisturbed = 3 == this.sentinel.callListener(data,this.subject,origin,3)) {
			if(null != this.bubblingTargets) {
				var $it0 = this.bubblingTargets.iterator();
				while( $it0.hasNext() ) {
					var bubblingTarget = $it0.next();
					bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 116, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
				}
			}
			if(null != this.notificationTargets) {
				var $it1 = this.notificationTargets.iterator();
				while( $it1.hasNext() ) {
					var notificationTarget = $it1.next();
					notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 121, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
				}
			}
		}
	}
	,get_isListenedTo: function() {
		return this.sentinel.get_isConnected();
	}
	,getOrigin: function(origin) {
		if(null == origin) return this.subject; else return origin;
	}
	,verifyCaller: function(positionInformation) {
		if(null == this.subjectClassNames) this.subjectClassNames = haxe.TypeTools.getClassNames(this.subject);
		var $it0 = this.subjectClassNames.iterator();
		while( $it0.hasNext() ) {
			var subjectClassName = $it0.next();
			if(subjectClassName == positionInformation.className) return;
		}
		throw new haxe.exception.Exception("This method may only be called by the subject of the signaler.",null,2);
	}
	,removeBubblingTarget: function(value) {
		if(null != this.bubblingTargets) this.bubblingTargets.remove(value);
	}
	,removeNotificationTarget: function(value) {
		if(null != this.notificationTargets) this.notificationTargets.remove(value);
	}
	,unbind: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.RegularBond(listener));
	}
	,unbindAdvanced: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	}
	,unbindVoid: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	}
	,__class__: hsl.haxe.DirectSignaler
	,__properties__: {get_isListenedTo:"get_isListenedTo"}
};
hsl.haxe._DirectSignaler = {};
hsl.haxe._DirectSignaler.LinkedBond = function() {
	hsl.haxe.Bond.call(this);
	this.destroyed = false;
};
hsl.haxe._DirectSignaler.LinkedBond.__name__ = ["hsl","haxe","_DirectSignaler","LinkedBond"];
hsl.haxe._DirectSignaler.LinkedBond.__super__ = hsl.haxe.Bond;
hsl.haxe._DirectSignaler.LinkedBond.prototype = $extend(hsl.haxe.Bond.prototype,{
	callListener: function(data,currentTarget,origin,propagationStatus) {
		return 0;
	}
	,determineEquals: function(value) {
		return false;
	}
	,destroy: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,unlink: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,__class__: hsl.haxe._DirectSignaler.LinkedBond
});
hsl.haxe._DirectSignaler.SentinelBond = function() {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.next = this.previous = this;
};
hsl.haxe._DirectSignaler.SentinelBond.__name__ = ["hsl","haxe","_DirectSignaler","SentinelBond"];
hsl.haxe._DirectSignaler.SentinelBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.SentinelBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	add: function(value) {
		value.next = this;
		value.previous = this.previous;
		return this.previous = this.previous.next = value;
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		var node = this.next;
		while(node != this && 1 != propagationStatus) {
			propagationStatus = node.callListener(data,currentTarget,origin,propagationStatus);
			node = node.next;
		}
		return propagationStatus;
	}
	,get_isConnected: function() {
		return this.next != this;
	}
	,remove: function(value) {
		var node = this.next;
		while(node != this) {
			if(node.determineEquals(value)) {
				if(false == node.destroyed) {
					node.previous.next = node.next;
					node.next.previous = node.previous;
					node.destroyed = true;
				}
				break;
			}
			node = node.next;
		}
	}
	,__class__: hsl.haxe._DirectSignaler.SentinelBond
	,__properties__: {get_isConnected:"get_isConnected"}
});
hsl.haxe._DirectSignaler.RegularBond = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.RegularBond.__name__ = ["hsl","haxe","_DirectSignaler","RegularBond"];
hsl.haxe._DirectSignaler.RegularBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.RegularBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	callListener: function(data,currentTarget,origin,propagationStatus) {
		if(false == this.halted) {
			this.listener(data);
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
		}
		return propagationStatus;
	}
	,determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.RegularBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,__class__: hsl.haxe._DirectSignaler.RegularBond
});
hsl.haxe._DirectSignaler.NiladicBond = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.NiladicBond.__name__ = ["hsl","haxe","_DirectSignaler","NiladicBond"];
hsl.haxe._DirectSignaler.NiladicBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.NiladicBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	callListener: function(data,currentTarget,origin,propagationStatus) {
		if(false == this.halted) {
			this.listener();
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
		}
		return propagationStatus;
	}
	,determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.NiladicBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,__class__: hsl.haxe._DirectSignaler.NiladicBond
});
hsl.haxe._DirectSignaler.AdvancedBond = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.AdvancedBond.__name__ = ["hsl","haxe","_DirectSignaler","AdvancedBond"];
hsl.haxe._DirectSignaler.AdvancedBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.AdvancedBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	callListener: function(data,currentTarget,origin,propagationStatus) {
		if(this.halted == false) {
			var signal = new hsl.haxe.Signal(data,this,currentTarget,origin);
			this.listener(signal);
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
			if(signal.immediatePropagationStopped) return 1; else if(signal.propagationStopped) return 2;
		}
		return propagationStatus;
	}
	,determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.AdvancedBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,__class__: hsl.haxe._DirectSignaler.AdvancedBond
});
hsl.haxe.PropagationStatus = function() { };
hsl.haxe.PropagationStatus.__name__ = ["hsl","haxe","PropagationStatus"];
hsl.haxe.Signal = function(data,currentBond,currentTarget,origin) {
	this.data = data;
	this.currentBond = currentBond;
	this.currentTarget = currentTarget;
	this.origin = origin;
	this.immediatePropagationStopped = false;
	this.propagationStopped = false;
};
hsl.haxe.Signal.__name__ = ["hsl","haxe","Signal"];
hsl.haxe.Signal.prototype = {
	get_data1: function() {
		return this.data;
	}
	,stopImmediatePropagation: function() {
		this.immediatePropagationStopped = true;
	}
	,stopPropagation: function() {
		this.propagationStopped = true;
	}
	,__class__: hsl.haxe.Signal
	,__properties__: {get_data1:"get_data1"}
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
var milkshake = {};
milkshake.Settings = function(width,height,color) {
	if(color == null) color = 16773120;
	if(height == null) height = 720;
	if(width == null) width = 200;
	this.width = width;
	this.height = height;
	this.color = color;
};
milkshake.Settings.__name__ = ["milkshake","Settings"];
milkshake.Settings.fromMilk = function(milkFile) {
	return new milkshake.Settings();
};
milkshake.Settings.prototype = {
	__class__: milkshake.Settings
};
milkshake.Milkshake = $hx_exports.milkshake.Milkshake = function(settings) {
	this.settings = settings;
	this.renderer = PIXI.autoDetectRenderer(settings.width,settings.height,{ view : window.document.getElementById("canvas")});
	window.document.body.appendChild(this.renderer.view);
	this.raf = new milkshake.utils.RAFHelper($bind(this,this.update));
	this.raf.start();
	this.stage = new PIXI.Container();
	this.scenes = new milkshake.game.scene.SceneManager();
	this.stage.addChild(this.scenes.displayObject);
};
milkshake.Milkshake.__name__ = ["milkshake","Milkshake"];
milkshake.Milkshake.getInstance = function() {
	if(milkshake.Milkshake.instance != null) return milkshake.Milkshake.instance;
	return null;
};
milkshake.Milkshake.boot = function(settings) {
	return milkshake.Milkshake.instance = new milkshake.Milkshake(settings != null?settings:new milkshake.Settings());
};
milkshake.Milkshake.prototype = {
	update: function(delta) {
		this.scenes.update(delta);
		this.renderer.render(this.stage);
	}
	,__class__: milkshake.Milkshake
};
milkshake.assets = {};
milkshake.assets.SpriteSheets = function() { };
milkshake.assets.SpriteSheets.__name__ = ["milkshake","assets","SpriteSheets"];
milkshake.assets.loader = {};
milkshake.assets.loader.AssetLoader = function(urls,autoLoad) {
	if(autoLoad == null) autoLoad = false;
	this.loader = new PIXI.loaders.Loader();
	var _g = 0;
	while(_g < urls.length) {
		var url = urls[_g];
		++_g;
		this.loader.add(url,url);
	}
	this.loaded = urls.length == 0;
	this.onLoadStarted = new hsl.haxe.DirectSignaler(this);
	this.onLoadUpdate = new hsl.haxe.DirectSignaler(this);
	this.onLoadComplete = new hsl.haxe.DirectSignaler(this);
	if(autoLoad) this.load();
};
milkshake.assets.loader.AssetLoader.__name__ = ["milkshake","assets","loader","AssetLoader"];
milkshake.assets.loader.AssetLoader.prototype = {
	load: function() {
		this.onLoadStarted.dispatch(null,this,{ fileName : "AssetLoader.hx", lineNumber : 36, className : "milkshake.assets.loader.AssetLoader", methodName : "load"});
		this.loader.once("complete",$bind(this,this.handleLoaded));
		this.loader.load();
	}
	,handleLoaded: function() {
		this.loaded = true;
		this.onLoadComplete.dispatch(null,this,{ fileName : "AssetLoader.hx", lineNumber : 46, className : "milkshake.assets.loader.AssetLoader", methodName : "handleLoaded"});
	}
	,__class__: milkshake.assets.loader.AssetLoader
};
milkshake.core = {};
milkshake.core.Node = function(id) {
	if(id == null) {
		var e = Type["typeof"](this);
		this.id = e[0];
	} else this.id = id;
	this.nodes = [];
	this.onNodeAdded = new hsl.haxe.DirectSignaler(this);
	this.onNodeRemoved = new hsl.haxe.DirectSignaler(this);
};
milkshake.core.Node.__name__ = ["milkshake","core","Node"];
milkshake.core.Node.prototype = {
	update: function(deltaTime) {
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			node.update(deltaTime);
		}
	}
	,addNode: function(node,defaultValues) {
		node.parent = this;
		this.nodes.push(node);
		if(defaultValues != null) {
			var _g = 0;
			var _g1 = Reflect.fields(defaultValues);
			while(_g < _g1.length) {
				var key = _g1[_g];
				++_g;
				Reflect.setProperty(node,key,Reflect.field(defaultValues,key));
			}
		}
		this.onNodeAdded.dispatch(node,null,{ fileName : "Node.hx", lineNumber : 47, className : "milkshake.core.Node", methodName : "addNode"});
	}
	,removeNode: function(node) {
		node.parent = null;
		HxOverrides.remove(this.nodes,node);
		this.onNodeRemoved.dispatch(node,null,{ fileName : "Node.hx", lineNumber : 55, className : "milkshake.core.Node", methodName : "removeNode"});
	}
	,__class__: milkshake.core.Node
};
milkshake.core.Entity = function(id) {
	milkshake.core.Node.call(this,id);
	this.set_position(milkshake.math.Vector2.get_ZERO());
};
milkshake.core.Entity.__name__ = ["milkshake","core","Entity"];
milkshake.core.Entity.__super__ = milkshake.core.Node;
milkshake.core.Entity.prototype = $extend(milkshake.core.Node.prototype,{
	get_position: function() {
		return this.position;
	}
	,set_position: function(value) {
		return this.position = value;
	}
	,get_x: function() {
		return this.get_position().x;
	}
	,set_x: function(value) {
		return this.get_position().x = value;
	}
	,get_y: function() {
		return this.get_position().y;
	}
	,set_y: function(value) {
		return this.get_position().y = value;
	}
	,__class__: milkshake.core.Entity
	,__properties__: {set_y:"set_y",get_y:"get_y",set_x:"set_x",get_x:"get_x",set_position:"set_position",get_position:"get_position"}
});
milkshake.core.DisplayObject = function(id) {
	milkshake.core.Entity.call(this,id);
	this.scale = milkshake.math.Vector2.get_ONE();
	this.pivot = milkshake.math.Vector2.get_ZERO();
	this.rotation = 0;
	this.visible = true;
	this.alpha = 1;
	this.displayObject = new PIXI.Container();
};
milkshake.core.DisplayObject.__name__ = ["milkshake","core","DisplayObject"];
milkshake.core.DisplayObject.__super__ = milkshake.core.Entity;
milkshake.core.DisplayObject.prototype = $extend(milkshake.core.Entity.prototype,{
	get_width: function() {
		return this.displayObject.width;
	}
	,get_height: function() {
		return this.displayObject.height;
	}
	,addNode: function(node,defaultValues) {
		if(js.Boot.__instanceof(node,milkshake.core.DisplayObject)) {
			var displayObjectNode = node;
			this.displayObject.addChild(displayObjectNode.displayObject);
			displayObjectNode.set_scene(this.get_scene());
			displayObjectNode.create();
		}
		milkshake.core.Entity.prototype.addNode.call(this,node,defaultValues);
	}
	,removeNode: function(node) {
		if(js.Boot.__instanceof(node,milkshake.core.DisplayObject)) {
			var displayObjectNode = node;
			this.displayObject.removeChild(displayObjectNode.displayObject);
			displayObjectNode.set_scene(null);
			displayObjectNode.destroy();
		}
		milkshake.core.Entity.prototype.removeNode.call(this,node);
	}
	,update: function(delta) {
		this.displayObject.position.x = this.get_position().x;
		this.displayObject.position.y = this.get_position().y;
		this.displayObject.scale.x = this.scale.x;
		this.displayObject.scale.y = this.scale.y;
		this.displayObject.alpha = this.alpha;
		this.displayObject.pivot.x = this.pivot.x;
		this.displayObject.pivot.y = this.pivot.y;
		this.displayObject.rotation = this.rotation;
		this.displayObject.visible = this.visible;
		this.displayObject.alpha = this.alpha;
		milkshake.core.Entity.prototype.update.call(this,delta);
	}
	,render: function(camera) {
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			if(js.Boot.__instanceof(node,milkshake.core.DisplayObject)) {
				var displayObjectNode = node;
				displayObjectNode.render(camera);
			}
		}
	}
	,get_scene: function() {
		return this._scene;
	}
	,set_scene: function(scene) {
		var _g = 0;
		var _g1 = this.nodes;
		while(_g < _g1.length) {
			var node = _g1[_g];
			++_g;
			if(js.Boot.__instanceof(node,milkshake.core.DisplayObject)) {
				var displayObjectNode = node;
				displayObjectNode.set_scene(scene);
			}
		}
		return this._scene = scene;
	}
	,create: function() {
	}
	,destroy: function() {
	}
	,__class__: milkshake.core.DisplayObject
	,__properties__: $extend(milkshake.core.Entity.prototype.__properties__,{get_height:"get_height",get_width:"get_width",set_scene:"set_scene",get_scene:"get_scene"})
});
milkshake.core.Graphics = function() {
	milkshake.core.DisplayObject.call(this);
	this.anchor = milkshake.math.Vector2.get_ZERO();
	this.displayObject.addChild(this.graphics = new PIXI.Graphics());
};
milkshake.core.Graphics.__name__ = ["milkshake","core","Graphics"];
milkshake.core.Graphics.__super__ = milkshake.core.DisplayObject;
milkshake.core.Graphics.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	clear: function() {
		this.graphics.clear();
	}
	,begin: function(color,alpha,lineWidth,lineColor) {
		if(lineColor == null) lineColor = 16777215;
		if(lineWidth == null) lineWidth = 0;
		if(alpha == null) alpha = 1;
		this.graphics.beginFill(color,alpha);
		this.graphics.lineStyle(lineWidth,lineColor);
	}
	,drawRectangle: function(rectangle,fill) {
		this.graphics.drawRect(rectangle.x,rectangle.y,rectangle.width,rectangle.height);
	}
	,update: function(delta) {
		milkshake.core.DisplayObject.prototype.update.call(this,delta);
		this.displayObject.pivot.x = this.graphics.width - (1 - this.anchor.x) * this.graphics.width;
		this.displayObject.pivot.y = this.graphics.height - (1 - this.anchor.y) * this.graphics.height;
	}
	,__class__: milkshake.core.Graphics
});
milkshake.core.Sprite = function(texture,id) {
	if(id == null) id = "undefined-sprite";
	milkshake.core.DisplayObject.call(this,id);
	this.anchor = milkshake.math.Vector2.get_ZERO();
	this.displayObject.addChild(this.sprite = new PIXI.Sprite(texture));
};
milkshake.core.Sprite.__name__ = ["milkshake","core","Sprite"];
milkshake.core.Sprite.fromUrl = function(url) {
	return new milkshake.core.Sprite(PIXI.Texture.fromImage(url));
};
milkshake.core.Sprite.fromFrame = function(frame) {
	return new milkshake.core.Sprite(PIXI.Texture.fromFrame(frame));
};
milkshake.core.Sprite.__super__ = milkshake.core.DisplayObject;
milkshake.core.Sprite.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	update: function(delta) {
		this.sprite.anchor.x = this.anchor.x;
		this.sprite.anchor.y = this.anchor.y;
		milkshake.core.DisplayObject.prototype.update.call(this,delta);
	}
	,render: function(camera) {
	}
	,__class__: milkshake.core.Sprite
});
milkshake.core.Text = function(message) {
	if(message == null) message = "";
	milkshake.core.DisplayObject.call(this);
	this.displayObject.addChild(this.text = new PIXI.Text(message));
};
milkshake.core.Text.__name__ = ["milkshake","core","Text"];
milkshake.core.Text.__super__ = milkshake.core.DisplayObject;
milkshake.core.Text.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	setText: function(message) {
		this.text.text = message;
	}
	,__class__: milkshake.core.Text
});
milkshake.game = {};
milkshake.game.scene = {};
milkshake.game.scene.Scene = function(id,content,defaultCameras,clearColor) {
	if(clearColor == null) clearColor = 16711680;
	milkshake.core.DisplayObject.call(this,id);
	this.set_scene(this);
	this.loader = new milkshake.assets.loader.AssetLoader(content);
	this.cameras = new milkshake.game.scene.camera.CameraManager(defaultCameras);
};
milkshake.game.scene.Scene.__name__ = ["milkshake","game","scene","Scene"];
milkshake.game.scene.Scene.__super__ = milkshake.core.DisplayObject;
milkshake.game.scene.Scene.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	__class__: milkshake.game.scene.Scene
});
milkshake.game.scene.SceneManager = function() {
	milkshake.core.DisplayObject.call(this,"sceneManager");
	this.scenes = new haxe.ds.StringMap();
};
milkshake.game.scene.SceneManager.__name__ = ["milkshake","game","scene","SceneManager"];
milkshake.game.scene.SceneManager.__super__ = milkshake.core.DisplayObject;
milkshake.game.scene.SceneManager.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	addScene: function(scene) {
		this.scenes.set(scene.id,scene);
		if(this.currentScene == null) this.changeScene(scene.id);
	}
	,removeScene: function(sceneId) {
		this.scenes.remove(sceneId);
	}
	,changeScene: function(sceneId) {
		var _g = this;
		if(this.currentScene != null) this.removeNode(this.currentScene.cameras);
		this.currentScene = this.scenes.get(sceneId);
		this.set_scene(this.currentScene);
		if(this.currentScene.loader.loaded) {
			this.currentScene.create();
			this.addNode(this.currentScene.cameras);
		} else {
			this.currentScene.loader.onLoadComplete.bindVoid(function() {
				_g.currentScene.create();
				_g.addNode(_g.currentScene.cameras);
			}).destroyOnUse();
			this.currentScene.loader.load();
		}
	}
	,update: function(delta) {
		if(this.currentScene.loader.loaded) this.currentScene.update(delta);
		milkshake.core.DisplayObject.prototype.update.call(this,delta);
	}
	,__class__: milkshake.game.scene.SceneManager
});
milkshake.game.scene.camera = {};
milkshake.game.scene.camera.Camera = function(id,x,y,width,height,renderWidth,renderHeight,active) {
	if(active == null) active = true;
	if(renderHeight == null) renderHeight = -1;
	if(renderWidth == null) renderWidth = -1;
	milkshake.core.DisplayObject.call(this,id);
	this.set_x(x);
	this.set_y(y);
	this.width = width;
	this.height = height;
	if(renderWidth != -1) this.renderWidth = renderWidth; else this.renderWidth = milkshake.utils.Globals.SCREEN_WIDTH;
	if(renderHeight != -1) this.renderHeight = renderHeight; else this.renderHeight = milkshake.utils.Globals.SCREEN_HEIGHT;
	this.active = active;
	this.boundingBox = new PIXI.Rectangle(0,0,1,1);
	this.renderTexture = new PIXI.RenderTexture(milkshake.Milkshake.getInstance().renderer,this.renderWidth,this.renderHeight);
	this.renderSprite = new PIXI.Sprite(this.renderTexture);
	this.renderSprite.width = width;
	this.renderSprite.height = height;
	this.targetPosition = new milkshake.math.Vector2(width,height).multi(milkshake.math.Vector2.get_HALF());
	this.targetZoom = 1;
	this.matrix = new PIXI.Matrix();
	this.displayObject.addChild(this.renderSprite);
	this.topLeft = new PIXI.Point(0,0);
	this.bottomRight = new PIXI.Point(this.renderWidth,this.renderHeight);
};
milkshake.game.scene.camera.Camera.__name__ = ["milkshake","game","scene","camera","Camera"];
milkshake.game.scene.camera.Camera.__super__ = milkshake.core.DisplayObject;
milkshake.game.scene.camera.Camera.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	update: function(delta) {
		this.matrix.identity();
		this.matrix.translate(-this.targetPosition.x,-this.targetPosition.y);
		this.matrix.scale(this.targetZoom,this.targetZoom);
		this.matrix.translate(this.get_width() / 2,this.get_height() / 2);
		this.updateBoundingBox();
		this.get_scene().render(this);
		this.renderTexture.render(this.get_scene().displayObject,this.matrix,true);
		milkshake.core.DisplayObject.prototype.update.call(this,delta);
	}
	,updateBoundingBox: function() {
		var debugPadding = 0;
		var topLeft = this.matrix.applyInverse(this.topLeft);
		var bottomRight = this.matrix.applyInverse(this.bottomRight);
		this.boundingBox.x = topLeft.x;
		this.boundingBox.y = topLeft.y;
		this.boundingBox.width = bottomRight.x - topLeft.x;
		this.boundingBox.height = bottomRight.y - topLeft.y;
	}
	,__class__: milkshake.game.scene.camera.Camera
});
milkshake.game.scene.camera.CameraManager = function(cameras) {
	milkshake.core.DisplayObject.call(this,"cameraManager");
	if(cameras == null) cameras = milkshake.game.scene.camera.CameraPresets.get_DEFAULT();
	this.cameras = [];
	var _g = 0;
	while(_g < cameras.length) {
		var camera = cameras[_g];
		++_g;
		this.addCamera(camera);
	}
};
milkshake.game.scene.camera.CameraManager.__name__ = ["milkshake","game","scene","camera","CameraManager"];
milkshake.game.scene.camera.CameraManager.__super__ = milkshake.core.DisplayObject;
milkshake.game.scene.camera.CameraManager.prototype = $extend(milkshake.core.DisplayObject.prototype,{
	addCamera: function(camera) {
		this.cameras.push(camera);
		this.addNode(camera);
		this.currentCamera = camera;
		return camera;
	}
	,removeCamera: function(camera) {
		HxOverrides.remove(this.cameras,camera);
	}
	,switchCameras: function(cameraA,cameraB) {
		cameraA.active = false;
		cameraB.active = true;
	}
	,update: function(deltaTime) {
		var _g = 0;
		var _g1 = this.get_activeCameras();
		while(_g < _g1.length) {
			var camera = _g1[_g];
			++_g;
			this.currentCamera = camera;
			camera.update(deltaTime);
		}
	}
	,get_activeCameras: function() {
		return this.cameras.filter(function(camera) {
			return camera.active;
		});
	}
	,__class__: milkshake.game.scene.camera.CameraManager
	,__properties__: $extend(milkshake.core.DisplayObject.prototype.__properties__,{get_activeCameras:"get_activeCameras"})
});
milkshake.game.scene.camera.CameraPresets = function() { };
milkshake.game.scene.camera.CameraPresets.__name__ = ["milkshake","game","scene","camera","CameraPresets"];
milkshake.game.scene.camera.CameraPresets.__properties__ = {get_SPLIT_FOUR:"get_SPLIT_FOUR",get_SPLIT_VERTICAL:"get_SPLIT_VERTICAL",get_DEFAULT:"get_DEFAULT"}
milkshake.game.scene.camera.CameraPresets.get_DEFAULT = function() {
	return [new milkshake.game.scene.camera.Camera("MAIN",0,0,milkshake.utils.Globals.SCREEN_WIDTH,milkshake.utils.Globals.SCREEN_HEIGHT)];
};
milkshake.game.scene.camera.CameraPresets.get_SPLIT_VERTICAL = function() {
	return [new milkshake.game.scene.camera.Camera("TOP",0,0,milkshake.utils.Globals.SCREEN_WIDTH / 2 | 0,milkshake.utils.Globals.SCREEN_HEIGHT),new milkshake.game.scene.camera.Camera("BOTTOM",milkshake.utils.Globals.SCREEN_WIDTH / 2 | 0,0,milkshake.utils.Globals.SCREEN_WIDTH / 2 | 0,milkshake.utils.Globals.SCREEN_HEIGHT)];
};
milkshake.game.scene.camera.CameraPresets.get_SPLIT_FOUR = function() {
	var screenWidth = milkshake.utils.Globals.SCREEN_WIDTH / 2 | 0;
	var screenHeight = milkshake.utils.Globals.SCREEN_HEIGHT / 2 | 0;
	return [new milkshake.game.scene.camera.Camera("TOP_LEFT",0,0,screenWidth,screenHeight),new milkshake.game.scene.camera.Camera("TOP_RIGHT",screenWidth,0,screenWidth,screenHeight),new milkshake.game.scene.camera.Camera("BOTTOM_LEFT",0,screenHeight,screenWidth,screenHeight),new milkshake.game.scene.camera.Camera("BOTTOM_RIGHT",screenWidth,screenHeight,screenWidth,screenHeight)];
};
milkshake.math = {};
milkshake.math.Vector2 = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
milkshake.math.Vector2.__name__ = ["milkshake","math","Vector2"];
milkshake.math.Vector2.__properties__ = {get_RIGHT:"get_RIGHT",get_LEFT:"get_LEFT",get_UP:"get_UP",get_DOWN:"get_DOWN",get_HALF:"get_HALF",get_ONE:"get_ONE",get_ZERO:"get_ZERO"}
milkshake.math.Vector2.get_ZERO = function() {
	return new milkshake.math.Vector2(0,0);
};
milkshake.math.Vector2.get_HALF = function() {
	return new milkshake.math.Vector2(0.5,0.5);
};
milkshake.math.Vector2.get_ONE = function() {
	return new milkshake.math.Vector2(1,1);
};
milkshake.math.Vector2.get_UP = function() {
	return new milkshake.math.Vector2(0,-1);
};
milkshake.math.Vector2.get_DOWN = function() {
	return new milkshake.math.Vector2(0,1);
};
milkshake.math.Vector2.get_LEFT = function() {
	return new milkshake.math.Vector2(-1,0);
};
milkshake.math.Vector2.get_RIGHT = function() {
	return new milkshake.math.Vector2(1,0);
};
milkshake.math.Vector2.EQUAL = function(value) {
	return new milkshake.math.Vector2(value,value);
};
milkshake.math.Vector2.multiplication = function(a,s) {
	return new milkshake.math.Vector2(a.x * s,a.y * s);
};
milkshake.math.Vector2.devision = function(a,s) {
	return new milkshake.math.Vector2(a.x / s,a.y / s);
};
milkshake.math.Vector2.addition = function(a,b) {
	return new milkshake.math.Vector2(a.x + b.x,a.y + b.y);
};
milkshake.math.Vector2.subtraction = function(a,b) {
	return new milkshake.math.Vector2(a.x - b.x,a.y - b.y);
};
milkshake.math.Vector2.prototype = {
	add: function(value) {
		this.x += value.x;
		this.y += value.y;
		return this;
	}
	,sub: function(value) {
		this.x -= value.x;
		this.y -= value.y;
		return this;
	}
	,multi: function(value) {
		return new milkshake.math.Vector2(this.x * value.x,this.y * value.y);
	}
	,multiSingle: function(value) {
		return new milkshake.math.Vector2(this.x * value,this.y * value);
	}
	,__class__: milkshake.math.Vector2
};
milkshake.utils = {};
milkshake.utils.Color = function() { };
milkshake.utils.Color.__name__ = ["milkshake","utils","Color"];
milkshake.utils.Globals = function() { };
milkshake.utils.Globals.__name__ = ["milkshake","utils","Globals"];
milkshake.utils.Globals.__properties__ = {get_SCREEN_CENTER:"get_SCREEN_CENTER",get_SCREEN_SIZE:"get_SCREEN_SIZE"}
milkshake.utils.Globals.get_SCREEN_SIZE = function() {
	return new milkshake.math.Vector2(milkshake.utils.Globals.SCREEN_WIDTH,milkshake.utils.Globals.SCREEN_HEIGHT);
};
milkshake.utils.Globals.get_SCREEN_CENTER = function() {
	return new milkshake.math.Vector2(milkshake.utils.Globals.SCREEN_WIDTH / 2,milkshake.utils.Globals.SCREEN_HEIGHT / 2);
};
milkshake.utils.GraphicsHelper = function() { };
milkshake.utils.GraphicsHelper.__name__ = ["milkshake","utils","GraphicsHelper"];
milkshake.utils.GraphicsHelper.generateRectangle = function(width,height,color) {
	var graphics = new milkshake.core.Graphics();
	graphics.graphics.beginFill(color);
	graphics.graphics.drawRect(0,0,width,height);
	return graphics;
};
milkshake.utils.RAFHelper = function(updateCallback) {
	this.lastTimeStamp = -1;
	this.updateCallback = updateCallback;
	this.multiplier = 1;
};
milkshake.utils.RAFHelper.__name__ = ["milkshake","utils","RAFHelper"];
milkshake.utils.RAFHelper.prototype = {
	start: function() {
		window.requestAnimationFrame($bind(this,this.update));
	}
	,update: function(deltaTime) {
		if(this.lastTimeStamp == -1) this.lastTimeStamp = deltaTime;
		var modifiedDeltaTime = (deltaTime - this.lastTimeStamp) * this.multiplier;
		this.updateCallback(modifiedDeltaTime);
		this.start();
		this.lastTimeStamp = deltaTime;
		return true;
	}
	,__class__: milkshake.utils.RAFHelper
};
milkshake.utils.TweenUtils = function() { };
milkshake.utils.TweenUtils.__name__ = ["milkshake","utils","TweenUtils"];
milkshake.utils.TweenUtils.tween = function(target,duration,properties) {
	return motion.Actuate.tween(target,duration,properties);
};
milkshake.utils.TweenUtils.tweenFrom = function(target,duration,properties) {
	var currentVariables = { };
	var _g = 0;
	var _g1 = Reflect.fields(properties);
	while(_g < _g1.length) {
		var property = _g1[_g];
		++_g;
		Reflect.setField(currentVariables,property,Reflect.getProperty(target,property));
	}
	var _g2 = 0;
	var _g11 = Reflect.fields(properties);
	while(_g2 < _g11.length) {
		var property1 = _g11[_g2];
		++_g2;
		Reflect.setProperty(target,property1,Reflect.field(properties,property1));
	}
	return motion.Actuate.tween(target,duration,currentVariables);
};
var motion = {};
motion.actuators = {};
motion.actuators.IGenericActuator = function() { };
motion.actuators.IGenericActuator.__name__ = ["motion","actuators","IGenericActuator"];
motion.actuators.IGenericActuator.prototype = {
	__class__: motion.actuators.IGenericActuator
};
motion.actuators.GenericActuator = function(target,duration,properties) {
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = motion.Actuate.defaultEase;
};
motion.actuators.GenericActuator.__name__ = ["motion","actuators","GenericActuator"];
motion.actuators.GenericActuator.__interfaces__ = [motion.actuators.IGenericActuator];
motion.actuators.GenericActuator.prototype = {
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) Reflect.setField(this.target,i,Reflect.field(this.properties,i)); else Reflect.setProperty(this.target,i,Reflect.field(this.properties,i));
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) params = [];
		return method.apply(method,params);
	}
	,change: function() {
		if(this._onUpdate != null) this.callMethod(this._onUpdate,this._onUpdateParams);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) this.callMethod(this._onComplete,this._onCompleteParams);
		}
		motion.Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		if(this.duration == 0) this.complete();
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) this._onRepeatParams = []; else this._onRepeatParams = parameters;
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		return this;
	}
	,onPause: function(handler,parameters) {
		this._onPause = handler;
		if(parameters == null) this._onPauseParams = []; else this._onPauseParams = parameters;
		return this;
	}
	,onResume: function(handler,parameters) {
		this._onResume = handler;
		if(parameters == null) this._onResumeParams = []; else this._onResumeParams = parameters;
		return this;
	}
	,pause: function() {
		if(this._onPause != null) this.callMethod(this._onPause,this._onPauseParams);
	}
	,reflect: function(value) {
		if(value == null) value = true;
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) times = -1;
		this._repeat = times;
		return this;
	}
	,resume: function() {
		if(this._onResume != null) this.callMethod(this._onResume,this._onResumeParams);
	}
	,reverse: function(value) {
		if(value == null) value = true;
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) value = true;
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) value = true;
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: motion.actuators.GenericActuator
};
motion.actuators.SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = new Array();
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = haxe.Timer.stamp();
	motion.actuators.GenericActuator.call(this,target,duration,properties);
	if(!motion.actuators.SimpleActuator.addedEvent) {
		motion.actuators.SimpleActuator.addedEvent = true;
		motion.actuators.SimpleActuator.timer = new haxe.Timer(33);
		motion.actuators.SimpleActuator.timer.run = motion.actuators.SimpleActuator.stage_onEnterFrame;
	}
};
motion.actuators.SimpleActuator.__name__ = ["motion","actuators","SimpleActuator"];
motion.actuators.SimpleActuator.stage_onEnterFrame = function() {
	var currentTime = haxe.Timer.stamp();
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g1 = 0;
	var _g = motion.actuators.SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		var i = _g1++;
		actuator = motion.actuators.SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(currentTime >= actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			motion.actuators.SimpleActuator.actuators.splice(j,1);
			--motion.actuators.SimpleActuator.actuatorsLength;
		}
	}
};
motion.actuators.SimpleActuator.__super__ = motion.actuators.GenericActuator;
motion.actuators.SimpleActuator.prototype = $extend(motion.actuators.GenericActuator.prototype,{
	setField_motion_actuators_SimpleActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",this.cacheVisible);
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) value = Reflect.field(target,propertyName); else value = Reflect.getProperty(target,propertyName);
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) start = Reflect.field(this.target,i); else {
				isField = false;
				start = Reflect.getProperty(this.target,i);
			}
			if(typeof(start) == "number") {
				var value = this.getField(this.properties,i);
				if(start == null) start = 0;
				if(value == null) value = 0;
				details = new motion.actuators.PropertyDetails(this.target,i,start,value - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && Object.prototype.hasOwnProperty.call(this.properties,"visible");
		if(this.toggleVisible && this.properties.alpha != 0 && !this.getField(this.target,"visible")) {
			this.setVisible = true;
			this.cacheVisible = this.getField(this.target,"visible");
			this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",true);
		}
		this.timeOffset = this.startTime;
		motion.actuators.SimpleActuator.actuators.push(this);
		++motion.actuators.SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		if(!this.paused) {
			this.paused = true;
			motion.actuators.GenericActuator.prototype.pause.call(this);
			this.pauseTime = haxe.Timer.stamp();
		}
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += haxe.Timer.stamp() - this.pauseTime;
			motion.actuators.GenericActuator.prototype.resume.call(this);
		}
	}
	,setProperty: function(details,value) {
		if(details.isField) details.target[details.propertyName] = value; else Reflect.setProperty(details.target,details.propertyName,value);
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) this.apply();
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) this.apply();
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g1 = 0;
				var _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					this.setProperty(details,details.start + details.change * easing);
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g11 = 0;
				var _g2 = this.detailsLength;
				while(_g11 < _g2) {
					var i2 = _g11++;
					details = this.propertyDetails[i2];
					if(this._smartRotation && (details.propertyName == "rotation" || details.propertyName == "rotationX" || details.propertyName == "rotationY" || details.propertyName == "rotationZ")) {
						var rotation = details.change % 360;
						if(rotation > 180) rotation -= 360; else if(rotation < -180) rotation += 360;
						endValue = details.start + rotation * easing;
					} else endValue = details.start + details.change * easing;
					if(!this._snapping) {
						if(details.isField) details.target[details.propertyName] = endValue; else Reflect.setProperty(details.target,details.propertyName,endValue);
					} else this.setProperty(details,Math.round(endValue));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion.actuators.SimpleActuator
});
motion.easing = {};
motion.easing.Expo = function() { };
motion.easing.Expo.__name__ = ["motion","easing","Expo"];
motion.easing.Expo.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion.easing.Expo.get_easeIn = function() {
	return new motion.easing.ExpoEaseIn();
};
motion.easing.Expo.get_easeInOut = function() {
	return new motion.easing.ExpoEaseInOut();
};
motion.easing.Expo.get_easeOut = function() {
	return new motion.easing.ExpoEaseOut();
};
motion.easing.IEasing = function() { };
motion.easing.IEasing.__name__ = ["motion","easing","IEasing"];
motion.easing.IEasing.prototype = {
	__class__: motion.easing.IEasing
};
motion.easing.ExpoEaseOut = function() {
};
motion.easing.ExpoEaseOut.__name__ = ["motion","easing","ExpoEaseOut"];
motion.easing.ExpoEaseOut.__interfaces__ = [motion.easing.IEasing];
motion.easing.ExpoEaseOut.prototype = {
	calculate: function(k) {
		if(k == 1) return 1; else return 1 - Math.pow(2,-10 * k);
	}
	,ease: function(t,b,c,d) {
		if(t == d) return b + c; else return c * (1 - Math.pow(2,-10 * t / d)) + b;
	}
	,__class__: motion.easing.ExpoEaseOut
};
motion.Actuate = function() { };
motion.Actuate.__name__ = ["motion","Actuate"];
motion.Actuate.apply = function(target,properties,customActuator) {
	motion.Actuate.stop(target,properties);
	if(customActuator == null) customActuator = motion.Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
motion.Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) allowCreation = true;
	if(!(motion.Actuate.targetLibraries.h.__keys__[target.__id__] != null) && allowCreation) motion.Actuate.targetLibraries.set(target,new Array());
	return motion.Actuate.targetLibraries.h[target.__id__];
};
motion.Actuate.isActive = function() {
	var result = false;
	var $it0 = motion.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		result = true;
		break;
	}
	return result;
};
motion.Actuate.motionPath = function(target,duration,properties,overwrite) {
	if(overwrite == null) overwrite = true;
	return motion.Actuate.tween(target,duration,properties,overwrite,motion.actuators.MotionPathActuator);
};
motion.Actuate.pause = function(target) {
	if(js.Boot.__instanceof(target,motion.actuators.IGenericActuator)) {
		var actuator = target;
		actuator.pause();
	} else {
		var library = motion.Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.pause();
			}
		}
	}
};
motion.Actuate.pauseAll = function() {
	var $it0 = motion.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.pause();
		}
	}
};
motion.Actuate.reset = function() {
	var $it0 = motion.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var i = library.length - 1;
		while(i >= 0) {
			library[i].stop(null,false,false);
			i--;
		}
	}
	motion.Actuate.targetLibraries = new haxe.ds.ObjectMap();
};
motion.Actuate.resume = function(target) {
	if(js.Boot.__instanceof(target,motion.actuators.IGenericActuator)) {
		var actuator = target;
		actuator.resume();
	} else {
		var library = motion.Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.resume();
			}
		}
	}
};
motion.Actuate.resumeAll = function() {
	var $it0 = motion.Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.resume();
		}
	}
};
motion.Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js.Boot.__instanceof(target,motion.actuators.IGenericActuator)) {
			var actuator = target;
			actuator.stop(null,complete,sendEvent);
		} else {
			var library = motion.Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					Reflect.setField(temp,properties,null);
					properties = temp;
				} else if((properties instanceof Array) && properties.__enum__ == null) {
					var temp1 = { };
					var _g = 0;
					var _g1;
					_g1 = js.Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						Reflect.setField(temp1,property,null);
					}
					properties = temp1;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					i--;
				}
			}
		}
	}
};
motion.Actuate.timer = function(duration,customActuator) {
	return motion.Actuate.tween(new motion._Actuate.TweenTimer(0),duration,new motion._Actuate.TweenTimer(1),false,customActuator);
};
motion.Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = motion.Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion.Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
				library = motion.Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return motion.Actuate.apply(target,properties,customActuator);
	}
	return null;
};
motion.Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion.Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(motion.Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion.Actuate.targetLibraries.h[target.__id__].length == 0) motion.Actuate.targetLibraries.remove(target);
	}
};
motion.Actuate.update = function(target,duration,start,end,overwrite) {
	if(overwrite == null) overwrite = true;
	var properties = { start : start, end : end};
	return motion.Actuate.tween(target,duration,properties,overwrite,motion.actuators.MethodActuator);
};
motion._Actuate = {};
motion._Actuate.TweenTimer = function(progress) {
	this.progress = progress;
};
motion._Actuate.TweenTimer.__name__ = ["motion","_Actuate","TweenTimer"];
motion._Actuate.TweenTimer.prototype = {
	__class__: motion._Actuate.TweenTimer
};
motion.MotionPath = function() {
	this._x = new motion.ComponentPath();
	this._y = new motion.ComponentPath();
	this._rotation = null;
};
motion.MotionPath.__name__ = ["motion","MotionPath"];
motion.MotionPath.prototype = {
	bezier: function(x,y,controlX,controlY,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion.BezierPath(x,controlX,strength));
		this._y.addPath(new motion.BezierPath(y,controlY,strength));
		return this;
	}
	,line: function(x,y,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion.LinearPath(x,strength));
		this._y.addPath(new motion.LinearPath(y,strength));
		return this;
	}
	,get_rotation: function() {
		if(this._rotation == null) this._rotation = new motion.RotationPath(this._x,this._y);
		return this._rotation;
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,__class__: motion.MotionPath
	,__properties__: {get_y:"get_y",get_x:"get_x",get_rotation:"get_rotation"}
};
motion.IComponentPath = function() { };
motion.IComponentPath.__name__ = ["motion","IComponentPath"];
motion.IComponentPath.prototype = {
	__class__: motion.IComponentPath
};
motion.ComponentPath = function() {
	this.paths = new Array();
	this.start = 0;
	this.totalStrength = 0;
};
motion.ComponentPath.__name__ = ["motion","ComponentPath"];
motion.ComponentPath.__interfaces__ = [motion.IComponentPath];
motion.ComponentPath.prototype = {
	addPath: function(path) {
		this.paths.push(path);
		this.totalStrength += path.strength;
	}
	,calculate: function(k) {
		if(this.paths.length == 1) return this.paths[0].calculate(this.start,k); else {
			var ratio = k * this.totalStrength;
			var lastEnd = this.start;
			var _g = 0;
			var _g1 = this.paths;
			while(_g < _g1.length) {
				var path = _g1[_g];
				++_g;
				if(ratio > path.strength) {
					ratio -= path.strength;
					lastEnd = path.end;
				} else return path.calculate(lastEnd,ratio / path.strength);
			}
		}
		return 0;
	}
	,get_end: function() {
		if(this.paths.length > 0) {
			var path = this.paths[this.paths.length - 1];
			return path.end;
		} else return this.start;
	}
	,__class__: motion.ComponentPath
	,__properties__: {get_end:"get_end"}
};
motion.BezierPath = function(end,control,strength) {
	this.end = end;
	this.control = control;
	this.strength = strength;
};
motion.BezierPath.__name__ = ["motion","BezierPath"];
motion.BezierPath.prototype = {
	calculate: function(start,k) {
		return (1 - k) * (1 - k) * start + 2 * (1 - k) * k * this.control + k * k * this.end;
	}
	,__class__: motion.BezierPath
};
motion.LinearPath = function(end,strength) {
	motion.BezierPath.call(this,end,0,strength);
};
motion.LinearPath.__name__ = ["motion","LinearPath"];
motion.LinearPath.__super__ = motion.BezierPath;
motion.LinearPath.prototype = $extend(motion.BezierPath.prototype,{
	calculate: function(start,k) {
		return start + k * (this.end - start);
	}
	,__class__: motion.LinearPath
});
motion.RotationPath = function(x,y) {
	this.step = 0.01;
	this._x = x;
	this._y = y;
	this.offset = 0;
	this.start = this.calculate(0.0);
};
motion.RotationPath.__name__ = ["motion","RotationPath"];
motion.RotationPath.__interfaces__ = [motion.IComponentPath];
motion.RotationPath.prototype = {
	calculate: function(k) {
		var dX = this._x.calculate(k) - this._x.calculate(k + this.step);
		var dY = this._y.calculate(k) - this._y.calculate(k + this.step);
		var angle = Math.atan2(dY,dX) * (180 / Math.PI);
		angle = (angle + this.offset) % 360;
		return angle;
	}
	,get_end: function() {
		return this.calculate(1.0);
	}
	,__class__: motion.RotationPath
	,__properties__: {get_end:"get_end"}
};
motion.actuators.MethodActuator = function(target,duration,properties) {
	this.currentParameters = new Array();
	this.tweenProperties = { };
	motion.actuators.SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) this.properties.start = new Array();
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0;
	var _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(this.properties.start[i]);
	}
};
motion.actuators.MethodActuator.__name__ = ["motion","actuators","MethodActuator"];
motion.actuators.MethodActuator.__super__ = motion.actuators.SimpleActuator;
motion.actuators.MethodActuator.prototype = $extend(motion.actuators.SimpleActuator.prototype,{
	apply: function() {
		this.callMethod(this.target,this.properties.end);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		this.callMethod(this.target,this.currentParameters);
		motion.actuators.SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || ((start | 0) === start)) {
				details = new motion.actuators.PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion.actuators.SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active && !this.paused) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			this.callMethod(this.target,this.currentParameters);
		}
	}
	,__class__: motion.actuators.MethodActuator
});
motion.actuators.MotionPathActuator = function(target,duration,properties) {
	motion.actuators.SimpleActuator.call(this,target,duration,properties);
};
motion.actuators.MotionPathActuator.__name__ = ["motion","actuators","MotionPathActuator"];
motion.actuators.MotionPathActuator.__super__ = motion.actuators.SimpleActuator;
motion.actuators.MotionPathActuator.prototype = $extend(motion.actuators.SimpleActuator.prototype,{
	setField_motion_actuators_MotionPathActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) Reflect.setField(this.target,propertyName,(js.Boot.__cast(Reflect.field(this.properties,propertyName) , motion.IComponentPath)).get_end()); else Reflect.setProperty(this.target,propertyName,(js.Boot.__cast(Reflect.field(this.properties,propertyName) , motion.IComponentPath)).get_end());
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js.Boot.__cast(Reflect.field(this.properties,propertyName) , motion.IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					path.start = Reflect.getProperty(this.target,propertyName);
				}
				details = new motion.actuators.PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(details1.isField) Reflect.setField(details1.target,details1.propertyName,(js.Boot.__cast(details1 , motion.actuators.PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details1.target,details1.propertyName,(js.Boot.__cast(details1 , motion.actuators.PropertyPathDetails)).path.calculate(easing));
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g2 = 0;
				var _g11 = this.propertyDetails;
				while(_g2 < _g11.length) {
					var details2 = _g11[_g2];
					++_g2;
					if(!this._snapping) {
						if(details2.isField) Reflect.setField(details2.target,details2.propertyName,(js.Boot.__cast(details2 , motion.actuators.PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details2.target,details2.propertyName,(js.Boot.__cast(details2 , motion.actuators.PropertyPathDetails)).path.calculate(easing));
					} else if(details2.isField) Reflect.setField(details2.target,details2.propertyName,Math.round((js.Boot.__cast(details2 , motion.actuators.PropertyPathDetails)).path.calculate(easing))); else Reflect.setProperty(details2.target,details2.propertyName,Math.round((js.Boot.__cast(details2 , motion.actuators.PropertyPathDetails)).path.calculate(easing)));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField_motion_actuators_MotionPathActuator_T(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion.actuators.MotionPathActuator
});
motion.actuators.PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
motion.actuators.PropertyDetails.__name__ = ["motion","actuators","PropertyDetails"];
motion.actuators.PropertyDetails.prototype = {
	__class__: motion.actuators.PropertyDetails
};
motion.actuators.PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	motion.actuators.PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
motion.actuators.PropertyPathDetails.__name__ = ["motion","actuators","PropertyPathDetails"];
motion.actuators.PropertyPathDetails.__super__ = motion.actuators.PropertyDetails;
motion.actuators.PropertyPathDetails.prototype = $extend(motion.actuators.PropertyDetails.prototype,{
	__class__: motion.actuators.PropertyPathDetails
});
motion.easing.Elastic = function() { };
motion.easing.Elastic.__name__ = ["motion","easing","Elastic"];
motion.easing.Elastic.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion.easing.Elastic.get_easeIn = function() {
	return new motion.easing.ElasticEaseIn(0.1,0.4);
};
motion.easing.Elastic.get_easeInOut = function() {
	return new motion.easing.ElasticEaseInOut(0.1,0.4);
};
motion.easing.Elastic.get_easeOut = function() {
	return new motion.easing.ElasticEaseOut(0.1,0.4);
};
motion.easing.ElasticEaseIn = function(a,p) {
	this.a = a;
	this.p = p;
};
motion.easing.ElasticEaseIn.__name__ = ["motion","easing","ElasticEaseIn"];
motion.easing.ElasticEaseIn.__interfaces__ = [motion.easing.IEasing];
motion.easing.ElasticEaseIn.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		var s;
		if(this.a < 1) {
			this.a = 1;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(1 / this.a);
		return -(this.a * Math.pow(2,10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / this.p));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if((t /= d) == 1) return b + c;
		var s;
		if(this.a < Math.abs(c)) {
			this.a = c;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(c / this.a);
		return -(this.a * Math.pow(2,10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / this.p)) + b;
	}
	,__class__: motion.easing.ElasticEaseIn
};
motion.easing.ElasticEaseInOut = function(a,p) {
	this.a = a;
	this.p = p;
};
motion.easing.ElasticEaseInOut.__name__ = ["motion","easing","ElasticEaseInOut"];
motion.easing.ElasticEaseInOut.__interfaces__ = [motion.easing.IEasing];
motion.easing.ElasticEaseInOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if((k /= 0.5) == 2) return 1;
		var p = 0.449999999999999956;
		var a = 1;
		var s = p / 4;
		if(k < 1) return -0.5 * (Math.pow(2,10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
		return Math.pow(2,-10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if((t /= d / 2) == 2) return b + c;
		var s;
		if(this.a < Math.abs(c)) {
			this.a = c;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(c / this.a);
		if(t < 1) return -0.5 * (this.a * Math.pow(2,10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / this.p)) + b;
		return this.a * Math.pow(2,-10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / this.p) * 0.5 + c + b;
	}
	,__class__: motion.easing.ElasticEaseInOut
};
motion.easing.ElasticEaseOut = function(a,p) {
	this.a = a;
	this.p = p;
};
motion.easing.ElasticEaseOut.__name__ = ["motion","easing","ElasticEaseOut"];
motion.easing.ElasticEaseOut.__interfaces__ = [motion.easing.IEasing];
motion.easing.ElasticEaseOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		var s;
		if(this.a < 1) {
			this.a = 1;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(1 / this.a);
		return this.a * Math.pow(2,-10 * k) * Math.sin((k - s) * (2 * Math.PI) / this.p) + 1;
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if((t /= d) == 1) return b + c;
		var s;
		if(this.a < Math.abs(c)) {
			this.a = c;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(c / this.a);
		return this.a * Math.pow(2,-10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / this.p) + c + b;
	}
	,__class__: motion.easing.ElasticEaseOut
};
motion.easing.ExpoEaseIn = function() {
};
motion.easing.ExpoEaseIn.__name__ = ["motion","easing","ExpoEaseIn"];
motion.easing.ExpoEaseIn.__interfaces__ = [motion.easing.IEasing];
motion.easing.ExpoEaseIn.prototype = {
	calculate: function(k) {
		if(k == 0) return 0; else return Math.pow(2,10 * (k - 1));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b; else return c * Math.pow(2,10 * (t / d - 1)) + b;
	}
	,__class__: motion.easing.ExpoEaseIn
};
motion.easing.ExpoEaseInOut = function() {
};
motion.easing.ExpoEaseInOut.__name__ = ["motion","easing","ExpoEaseInOut"];
motion.easing.ExpoEaseInOut.__interfaces__ = [motion.easing.IEasing];
motion.easing.ExpoEaseInOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		if((k /= 0.5) < 1.0) return 0.5 * Math.pow(2,10 * (k - 1));
		return 0.5 * (2 - Math.pow(2,-10 * --k));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if(t == d) return b + c;
		if((t /= d / 2.0) < 1.0) return c / 2 * Math.pow(2,10 * (t - 1)) + b;
		return c / 2 * (2 - Math.pow(2,-10 * --t)) + b;
	}
	,__class__: motion.easing.ExpoEaseInOut
};
var scenes = {};
scenes.TestScene = function() {
	milkshake.game.scene.Scene.call(this,"TestScene",["assets/images/dino/stars.png"],milkshake.game.scene.camera.CameraPresets.get_DEFAULT(),255);
};
scenes.TestScene.__name__ = ["scenes","TestScene"];
scenes.TestScene.__super__ = milkshake.game.scene.Scene;
scenes.TestScene.prototype = $extend(milkshake.game.scene.Scene.prototype,{
	create: function() {
		milkshake.game.scene.Scene.prototype.create.call(this);
		this.addNode(new milkshake.core.Sprite(PIXI.Texture.fromImage("assets/images/dino/stars.png")));
		this.addNode(this.logo = new milkshake.core.Sprite(PIXI.Texture.fromImage("assets/images/dino/logo.png")),{ anchor : milkshake.math.Vector2.get_HALF(), position : new milkshake.math.Vector2(milkshake.utils.Globals.get_SCREEN_CENTER().x,140)});
		this.addNode(this.world = new milkshake.core.Sprite(PIXI.Texture.fromImage("assets/images/dino/world.png")),{ anchor : milkshake.math.Vector2.get_HALF(), position : new milkshake.math.Vector2(milkshake.utils.Globals.get_SCREEN_CENTER().x,milkshake.utils.Globals.SCREEN_HEIGHT + 200), scale : milkshake.math.Vector2.EQUAL(0.8)});
		milkshake.utils.TweenUtils.tweenFrom(this.world,2,{ y : milkshake.utils.Globals.SCREEN_HEIGHT * 2}).delay(1).ease(motion.easing.Elastic.get_easeOut());
		milkshake.utils.TweenUtils.tweenFrom(this.logo,1,{ y : -200}).delay(1).ease(motion.easing.Elastic.get_easeOut());
	}
	,update: function(deltaTime) {
		milkshake.game.scene.Scene.prototype.update.call(this,deltaTime);
		this.world.rotation += 0.001 * deltaTime;
	}
	,__class__: scenes.TestScene
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
haxe.ds.ObjectMap.count = 0;
hsl.haxe.PropagationStatus.IMMEDIATELY_STOPPED = 1;
hsl.haxe.PropagationStatus.STOPPED = 2;
hsl.haxe.PropagationStatus.UNDISTURBED = 3;
milkshake.assets.SpriteSheets.PHYSICS = "/assets/spritesheets/physics.json";
milkshake.utils.Color.BLACK = 0;
milkshake.utils.Color.WHITE = 16777215;
milkshake.utils.Color.RED = 16711680;
milkshake.utils.Color.GREEN = 65280;
milkshake.utils.Color.BLUE = 255;
milkshake.utils.Globals.SCREEN_WIDTH = 1280;
milkshake.utils.Globals.SCREEN_HEIGHT = 720;
motion.actuators.SimpleActuator.actuators = new Array();
motion.actuators.SimpleActuator.actuatorsLength = 0;
motion.actuators.SimpleActuator.addedEvent = false;
motion.Actuate.defaultActuator = motion.actuators.SimpleActuator;
motion.Actuate.defaultEase = motion.easing.Expo.get_easeOut();
motion.Actuate.targetLibraries = new haxe.ds.ObjectMap();
Space.main();
})(typeof window != "undefined" ? window : exports);
