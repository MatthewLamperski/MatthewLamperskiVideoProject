//
//  MLPlayerManager.m
//  MatthewLamperskiVideoProject
//
//  Created by Matthew Lamperski on 4/27/23.
//
//  Exposes the MLPlayer component to the JavaScript layer.
//

#import <React/RCTBridge.h>
#import <React//RCTViewManager.h>

@interface RCT_EXTERN_MODULE(MLPlayerManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(src, NSDictionary);
RCT_EXPORT_VIEW_PROPERTY(paused, BOOL);
RCT_EXPORT_VIEW_PROPERTY(muted, BOOL);
RCT_EXPORT_VIEW_PROPERTY(seek, double);
RCT_EXPORT_VIEW_PROPERTY(speed, double);
RCT_EXPORT_VIEW_PROPERTY(onUpdateTime, RCTDirectEventBlock)
@end
